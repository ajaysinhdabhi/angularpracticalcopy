import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router:Router,public service:AuthService,private http:HttpClient){

  }
  userdata:any;
  employee:any;
  employeeuser:any;
  oemployeeuser:any;

  isvisible?:boolean
  empvisible?:boolean
gotologin(){
  this.router.navigate(['/login']);
}
gotoblog(){
  this.router.navigate(['/blog']);
}


showButton(){
  
  if(this.service.isloggedin()){
    this.isvisible=true;
    return true;
  }else{
    this.isvisible=false;
    return false;
  }
 

  
}

check(){
  // this.employeeuser = sessionStorage.getItem('username');
  // console.log(this.employeeuser);
  
  // this.oemployeeuser = JSON.parse(this.employeeuser)
  // console.log(this.oemployeeuser);
  
  // if(this.oemployeeuser.role=='admin'){
  //   return true;
  // }
  // else{
  //   return false;
  // }



  if(this.service.isadmin == 'admin'){
    return true
  }
  else{
    return false
  }
}


logout(){
  this.service.isloggedany=false;
  this.service.isadmin = 'user';
  sessionStorage.clear();
  this.router.navigate(['/login']);
  
}

// showemployee(){
//   this.http.get('http://localhost:3000/employeedata').subscribe(res=>{
//         this.userdata=res;
//         console.log(this.userdata);

//         this.userdata.forEach((element: any) => {
//         if(this.service.isloggedin() && element.role=='admin'){
//           this.empvisible=true;
//           return true;
//         }else{
//           this.empvisible=false;
//           return false;
//         }
//       });


//        })
// }



}
