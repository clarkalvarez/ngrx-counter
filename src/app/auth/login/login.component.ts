import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(loginStart({email, password}))
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
