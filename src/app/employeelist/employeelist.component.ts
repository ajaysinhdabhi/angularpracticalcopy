import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { EmployeeModel } from './employeelist.model';
import { MatDialog } from '@angular/material/dialog';
MatSort
MatFormField







@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent  implements OnInit{
 
  [x: string]: any;

  


  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData !:any;
  showAdd!:boolean;
  showUpdate!:boolean;

  @ViewChild('paginator') paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id','username', 'email', 'phone','action'];
  dataSource=new MatTableDataSource();

  

  constructor(private service:AuthService,private router:Router,private http:HttpClient,private snakebar:MatSnackBar,public dialog:MatDialog){

  }
 
  ngOnInit(){
    
    this.getAllEmployee();
    this.dataSource=new MatTableDataSource(this.employeeData)
       this.dataSource.paginator=this.paginator;
       this.dataSource.sort = this.sort;
    
     
  }

  loginForm=new FormGroup({
    username:new FormControl('',[Validators.required,Validators.maxLength(15)]),
    email:new FormControl('',[Validators.required,Validators.email,Validators.maxLength(30)]),
    phone:new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    role:new FormControl('',[Validators.required])
  })

  get username(){
    return this.loginForm.get('username')
  }
  get email(){
    return this.loginForm.get('email')
  }
  get phone(){
    return this.loginForm.get('phone')
  }
  get role(){
    return this.loginForm.get('role')
  }

  clickAddEmployee(){
    this.loginForm.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  postEmployeeDetails(){
     this.employeeModelObj.username=this.loginForm.value.username;
     this.employeeModelObj.email=this.loginForm.value.email;
     this.employeeModelObj.phone=this.loginForm.value.phone;
     this.employeeModelObj.role=this.loginForm.value.role;

     this.service.postEmployee(this.employeeModelObj)
     .subscribe((res: any)=>{
      console.log(res);
      // this.openDialog();
       this.snakebar.open("Data Added Successfully","ok",{
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000,
        
          
      }); 
      
      let ref=document.getElementById('cancel')
      ref?.click();
      this.loginForm.reset();
      this.getAllEmployee();
     },
       (err: any)=>{
        this.snakebar.open("Something Went Wrong","ok",{
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 5000,
          
            
        }); 
     
     })
  }

  getAllEmployee(){
    this.service.getEmployee()
    .subscribe(res=>{
       this.employeeData=res;
   
      this.dataSource=new MatTableDataSource(this.employeeData)
       this.dataSource.paginator=this.paginator;
       this.dataSource.sort = this.sort;
       
    })
  }

  deleteEmployee(row:any){
    console.log(row);
    
    // this.openDialog();
    this.service.deleteEmployee(row.id).subscribe(res=>{
      console.log(res);
      this.snakebar.open("Data Deleted Successfully","ok",{
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000,
        
          
      });  
    this.getAllEmployee();
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id;
    this.loginForm.controls['username'].setValue(row.username);
    this.loginForm.controls['email'].setValue(row.email);
    this.loginForm.controls['phone'].setValue(row.phone);
    this.loginForm.controls['role'].setValue(row.role)
  }

  updateEmployeeDetails(){
    this.employeeModelObj.username=this.loginForm.value.username;
     this.employeeModelObj.email=this.loginForm.value.email;
     this.employeeModelObj.phone=this.loginForm.value.phone;
     this.employeeModelObj.role=this.loginForm.value.role;

     this.service.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
     .subscribe(res=>{
      this.snakebar.open("Data Updated Successfully","ok",{
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000,
        
          
      });  
        let ref=document.getElementById('cancel')
        ref?.click();
        this.loginForm.reset();
        this.getAllEmployee(); 
     })
  }

    key:string='id';
    reverse:boolean=false;
    sort1(key: string){
      this.key=key;
      this.reverse=!this.reverse;
    }

    applyFilter($event: any) {
      const filterValue = ($event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog() {
      this.dialog.open(DialogElementsExampleDialog,{
        width: '40vw',
        height:'25vh',
        
        panelClass:"mystyle"
         
      }
      );
    }
    
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
