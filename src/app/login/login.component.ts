import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  islogged:any;
  loginForm=new FormGroup({
    user:new FormControl('',[Validators.required,Validators.maxLength(15)]),
    password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)])
  })
  admin?: boolean;
  userdata:any;

  constructor(private service:AuthService,private router:Router,private http:HttpClient){

  }

  //for get value of the user and pass
  loginUser(){

    
      // this.service.Getbycode(this.loginForm.value.user).subscribe((res)=>{
      //   this.userdata=res;
      //   console.log(this.userdata);
      
      // })
      
      this.http.get('http://localhost:8080/api/v1/employees').subscribe(res=>{
        this.userdata=res;
        console.log(this.userdata);

      


         this.userdata.forEach((element: any) => {
          if(element.role == 'admin' && element.password == this.loginForm.value.password && element.username == this.loginForm.value.user){
            
            this.islogged=true;
            this.admin = element.role;
            this.service.islog(this.islogged , this.admin);
            sessionStorage.setItem('username',JSON.stringify(element));
            this.router.navigate(['']);
          }
          else if(element.role == 'user' && element.password == this.loginForm.value.password && element.username == this.loginForm.value.user){
            this.islogged=true;
            this.admin = element.role;
        this.service.islog(this.islogged , this.admin);
            sessionStorage.setItem('username',JSON.stringify(element));
        this.router.navigate(['']);

          }
          
         });

         
        // if(this.userdata.password===this.loginForm.value.password){
        //       this.router.navigate(['/userlist']);
        // }
        
      })
  }







    // console.warn(this.loginForm.value);
    
  
  get user(){
    return this.loginForm.get('user')
  }
  get password(){
    return this.loginForm.get('password')
  }

  


}
