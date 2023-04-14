import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isvisible?:boolean;
  textshow?:boolean;

  constructor(private router:Router,private service:AuthService,private snakebar:MatSnackBar,public dialog:MatDialog){

  }

  showButton(){
    if(this.service.isloggedin()){
      this.isvisible=false;
      return true;
    }else{
      this.isvisible=true;
      return false;
    }
  }
  popup(){
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog,{
      width: '40vw',
      height:'25vh',
      disableClose: true,
       
    }
    );
  }


  
//last read more button
  showotherblog(){
    if(this.service.isloggedin()){
      this.textshow=true;    
      return true;
    }else{
     
      this.textshow=false; 
      // this.snakebar.open("please login","ok",{
        
      //   panelClass: ['mat-toolbar', 'mat-primary']
      // });
      this.openDialog();
      
      this.router.navigate(['/login']);
     
      return false;
    }
  }



  
  

 


}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}




