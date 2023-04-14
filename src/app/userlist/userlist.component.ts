import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
[x: string]: any;

constructor(private service:AuthService,private router:Router,private http:HttpClient){
  
}
  ngOnInit() {
    this.getuser();
  }
userdata:any;

getuser(){
  this.http.get('http://localhost:3000/myjsondata').subscribe(res=>{
    console.log(res);
    this.userdata=res;
    

})


}


}
