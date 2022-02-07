import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from "@angular/forms";
import { Employee } from 'src/app/Model/employee';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  formValue !: FormGroup;
  employeeObj : Employee = new Employee();
  employeeData : Employee[]=[];
 
 constructor(private formBuilder: FormBuilder, private api:ApiService) { }

 ngOnInit(): void {
   this.formValue = this.formBuilder.group({
     id:[''],
     name: [''],
     age: [''],
     job: [''],
     salary: ['']
   })
   this.getAllEmployee()
   
 }

   postEmployeeDetails(){

     
     this.employeeObj.name=this.formValue.value.name;
     this.employeeObj.age=this.formValue.value.age;
     this.employeeObj.job=this.formValue.value.job;
     this.employeeObj.salary=this.formValue.value.salary;
     
     console.log(this.employeeObj.name);
     console.log(this.employeeObj.age);
     console.log(this.employeeObj.job);
     console.log(this.employeeObj.salary);
       this.api.postEmployee(this.employeeObj).subscribe(res=>{
         console.log(res);
         alert("Employee Added Successfully") 
         this.formValue.reset()

       })
       this.getAllEmployee()
   }

   getAllEmployee(){
     this.api.getEmployee().subscribe(res=>{
       this.employeeData = res
     })
   }

   deleteEmployee(row:any){
     this.api.deleteEmployee(row.id).subscribe(res=>{
       alert("Employee Deleted")
       this.getAllEmployee()
     })
   }

}
