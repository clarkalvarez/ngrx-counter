import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onLoginSubmit() {
    console.log(this.loginForm.value)
  }

  showEmailErrors() {
    const emailField = this.loginForm.get('email')
    if(emailField?.touched && !emailField.valid) {
      if(emailField?.errors?.['required']) {
        return 'Email is required'
      }

      if(emailField?.errors?.['email']) {
        return 'Invalid Email'
      }
    }
    return
  }

  showPasswordErrors() {
    const passwordField = this.loginForm.get('password')
    if(passwordField?.touched && !passwordField.valid) {
      if(passwordField?.errors?.['required']) {
        return 'Password is required'
      } 
    }
    return
  }

}
