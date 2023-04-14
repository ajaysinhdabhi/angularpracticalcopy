import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component:UserlistComponent,
    canActivate:[AuthGuard],
    path:'userlist'
  },
  {
    component:BlogComponent,
    path:'blog'
  },
  {
    component:EmployeelistComponent,
    canActivate:[AuthGuard],
    path:'employeelist'
  },
  {
    component:HomeComponent,
    path:''
    
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
