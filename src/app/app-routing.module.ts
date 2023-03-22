import { AuthGuard } from './auth.guard';
import { CanActivate } from '@angular/router';
import { LeaveComponent } from './leave/leave.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
      },

      {path:'book-leave',
      component: LeaveComponent,
      canActivate: [AuthGuard]},
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
