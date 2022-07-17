import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.actions';
import { signupStart } from '../state/auth.actions';
import { AuthState } from '../state/auth.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup

  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSignupSubmit() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.store.dispatch(setLoadingSpinner({status: true}))
    this.store.dispatch(signupStart({email, password}))
  }

  showEmailErrors() {
    const emailField = this.signUpForm.get('email')
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
    const passwordField = this.signUpForm.get('password')
    if(passwordField?.touched && !passwordField.valid) {
      if(passwordField?.errors?.['required']) {
        return 'Password is required'
      } 
    }
    return
  }

}
