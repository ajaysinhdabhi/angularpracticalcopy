import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UserlistComponent } from './userlist/userlist.component';
import { HttpClientModule } from "@angular/common/http";
import { BlogComponent } from './blog/blog.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { DialogElementsExampleDialog, HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Ng2OrderModule } from "ng2-order-pipe";
import { DataTablesModule } from 'angular-datatables';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UserlistComponent,
    BlogComponent,
    EmployeelistComponent,
    HomeComponent,
    DialogElementsExampleDialog
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    Ng2OrderModule,
    DataTablesModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
  
    
    
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
