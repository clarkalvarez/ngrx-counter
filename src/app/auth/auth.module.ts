import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', 
    children: [
      {path: '', redirectTo: 'login',  pathMatch: "full"},
      {path: 'login', component: LoginComponent},
    ]
  }
]

// const routes: Routes =[
//   {
//     path: '',
//     component: LoginComponent, 
//   }
// ]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
