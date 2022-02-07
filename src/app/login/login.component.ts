import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    email:new FormControl("",[Validators.required,Validators.minLength(8)]),
    pass: new FormControl("",[Validators.required,Validators.minLength(8)])
  })
  get email(){
    return this.loginForm.get("email")
  }
  get pass(){
    return this.loginForm.get("pass")
  }
  login(){
    console.log(this.loginForm.value);
    
  }
  
    constructor() { }
  
    ngOnInit(): void {
    }
  

}


