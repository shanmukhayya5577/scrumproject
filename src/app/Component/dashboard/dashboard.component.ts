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

editFormID!:number
  formValue !: FormGroup;
  employeeObj : Employee = new Employee();
  employeeData : Employee[]=[];
 
 constructor(private formBuilder: FormBuilder, private api:ApiService) { }

 ngOnInit(): void {
   this.formValue = this.formBuilder.group({
     name: [''],
     age: [''],
     job: [''],
     salary: ['']
   })
   this.getAllEmployee()
   
 }
get name(){
  return this.formValue.get('name')
}
get age(){
  return this.formValue.get('age')
}
get job(){
  return this.formValue.get('job')
}
get salary(){
  return this.formValue.get('salary')
}
   postEmployeeDetail(){
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
         this.formValue.reset()
         this.getAllEmployee()
       })
      const buttonVal=document.getElementById('closebutton')
       buttonVal.click()
   }

   getAllEmployee(){
     this.api.getEmployee().subscribe(res=>{
       this.employeeData = res
     })
   }
   onEdit(val:any){
this.editFormID=val.id
    this.name.patchValue(val.name)
    this.age.patchValue(val.age)
    this.job.patchValue(val.job)
    this.salary.patchValue(val.salary) 
   }


   onupdate(){
    this.employeeObj.name=this.formValue.value.name;
    this.employeeObj.age=this.formValue.value.age;
    this.employeeObj.job=this.formValue.value.job;
    this.employeeObj.salary=this.formValue.value.salary;
    this.api.updateEmployee(this.employeeObj,this.editFormID).subscribe((x)=>{
      console.log('data edited'+x);
      this.getAllEmployee()
    })
    const buttonVal=document.getElementById('closebutton')
    buttonVal.click()
    this.formValue.reset()
   }
   deleteEmployee(row:any){
     this.api.deleteEmployee(row.id).subscribe(res=>{
       alert("Employee Deleted")
       this.getAllEmployee()
     })
   }


}
