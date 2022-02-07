import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  empIDEdit:number
  addBool:boolean=true
  UpdateBool:boolean=false
  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.getMethood()

  }
  empObj: employee = new employee()
  tableDisp: any
  employeeForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$'), Validators.minLength(3)]),
    designation: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$'), Validators.minLength(3)]),
    salary: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(5)]),
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(120)])

  })

  get fullName() {
    return this.employeeForm.get('fullName')
  }

  get designation() {
    return this.employeeForm.get('designation')
  }

  get salary() {
    return this.employeeForm.get('salary')
  }

  get age() {
    return this.employeeForm.get('age')
  }

  addEmployee() {
    this.empObj = {
      fullName: this.fullName?.value,
      designation: this.designation?.value,
      salary: this.salary?.value,
      age: this.age?.value
    }
    this.getMethood()
    this.postmethod(this.empObj)
    const buttonval=document.getElementById('closeButton')
    buttonval.click()
  }
  getMethood() {
    this.empService.getEmployee().subscribe((x) => {
      this.tableDisp = x
      console.log(x);
    })
  }
  postmethod(data: any) {
    this.empService.postEmployee(data).subscribe((x) => {
      console.log('data has been posted' + x);
      this.getMethood()
    })
    this.employeeForm.reset()
  }
  onEdit(r: any) {
    this.addBool=false
    this.UpdateBool=true
    this.empIDEdit=r.id
    this.fullName?.patchValue(r.fullName)
    this.designation?.patchValue(r.designation)
    this.salary?.patchValue(r.salary)
    this.age?.patchValue(r.age)
  }
  onUpdate(){
    this.empObj = {
      fullName: this.fullName?.value,
      designation: this.designation?.value,
      salary: this.salary?.value,
      age: this.age?.value
    }
    this.empService.putEmployee(this.empIDEdit,this.empObj).subscribe((x)=>{
      console.log('values updated sucess'+x);
      this.getMethood()
      })
      this.employeeForm.reset()
      const buttonval=document.getElementById('closeButton')
      buttonval.click()
      this.addBool=true
      this.UpdateBool=false
  }  
  ondelete(r: any) {
    this.empService.deleteEmployee(r).subscribe((x) => {
      console.log('item has been deleted' + x);
      this.getMethood()
    })
  }

}
