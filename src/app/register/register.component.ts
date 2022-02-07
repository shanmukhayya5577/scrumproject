import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted: boolean = false
  regForm: FormGroup

  constructor(private formBuild: FormBuilder) {
    this.regForm = this.formBuild.group({
      name: new FormControl("", [Validators.required, Validators.pattern(/^[A-Z a-z]+$/)]),
      uName: new FormControl("", [Validators.required, Validators.pattern(/^[A-Z a-z]+$/)]),
      email: new FormControl("", [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      pass: new FormControl("",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/)]),
      cPass: new FormControl("", [Validators.required]),
    },
      {
        validators: this.must('pass', 'cPass')
      })
  }

  get f() {
    return this.regForm.controls
  }

  must(password: string, confPassword: string) {
    return (formGroup: FormGroup) => {
      let pass = formGroup.controls[password]
      let confPass = formGroup.controls[confPassword]

      if (confPass.errors && !confPass.errors.must) {
        return
      }
      if (pass.value !== confPass.value) {
        return confPass.setErrors({ must: true })
      } else {
        return confPass.setErrors(null)
      }
    }
  }

  reg(){
    this.submitted=true;

    if(this.regForm.invalid && this.regForm.touched){
      return
    }

    localStorage.setItem("name",JSON.stringify(this.regForm.value.name))
    localStorage.setItem("userName",JSON.stringify(this.regForm.value.uName))
    localStorage.setItem("email",JSON.stringify(this.regForm.value.email))
    localStorage.setItem("password",JSON.stringify(this.regForm.value.pass))
    localStorage.setItem("confirmPassword",JSON.stringify(this.regForm.value.cPass))

  }
  ngOnInit(): void {
  }

}



