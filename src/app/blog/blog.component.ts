
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
import { BlogModel } from './blog.model';
import { MatDialog } from '@angular/material/dialog';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{
[x: string]: any;

  employeeData !:any;
  blogModelObj:BlogModel=new BlogModel();
  productImages!: [];

  @ViewChild('paginator') paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['email','action'];
  dataSource=new MatTableDataSource();


  constructor(private service:AuthService,private router:Router,private http:HttpClient,private snakebar:MatSnackBar,public dialog:MatDialog,private sanitizer:DomSanitizer){

  }
 
  ngOnInit(){
    
    this.getAllEmployee();
    this.dataSource=new MatTableDataSource(this.employeeData)
       this.dataSource.paginator=this.paginator;
       this.dataSource.sort = this.sort;
    
     
  }

  loginForm=new FormGroup({
  
    email:new FormControl('',[Validators.required,Validators.email,Validators.maxLength(30)]),
    
  })

  get email(){
    return this.loginForm.get('email')
  }

  clickAddEmployee(){
    this.loginForm.reset();
    
  }

  postEmployeeDetails(){
   
    this.blogModelObj.email=this.loginForm.value.email;
   
    this.service.postEmployee(this.blogModelObj)
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

 

 getAllEmployee(){
  this.service.getEmployee()
  .subscribe(res=>{
     this.employeeData=res;
 
    this.dataSource=new MatTableDataSource(this.employeeData)
     this.dataSource.paginator=this.paginator;
     this.dataSource.sort = this.sort;
     
  })
}

onFileSelected(event: any){
  if (event.target.files) {
    const file=event.target.files[0];

    const fileHandle: FileHandle={
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      )
    }

    this.productImages.push(fileHandle); 
  }
  
}


}
