import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './state/auth.selectors';
import { authReducer } from './state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';   
import { AuthEffects } from './state/auth.effects';

const routes: Routes = [
  {
    path: '', 
    children: [
      {path: '', redirectTo: 'login',  pathMatch: "full"},
      {path: 'login', component: LoginComponent},
    ]
  }
] 

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forChild(routes),
    StoreModule.forFeature(AUTH_STATE_NAME, authReducer)
  ]
})
export class AuthModule { }
