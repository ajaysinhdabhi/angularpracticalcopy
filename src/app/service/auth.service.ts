import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { BehaviorSubject, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isloggedany: any;
  isadmin?: any
  constructor(private http: HttpClient) { }

  apiurl = 'http://localhost:8080/api/v1/employees'
  islog(props: any, props2: any) {
    this.isloggedany = props;
    this.isadmin = props2
  }

  // isloggedin(){
  //   if(this.isloggedany==true){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }



  isloggedin() {
    if (sessionStorage.length !== 0) {
      return true;
    }
    else {
      return false;
    }
  }
  GetAll() {
    return this.http.get(this.apiurl)
  }
  Getbycode(code: any) {
    return this.http.get(this.apiurl + '/' + code)
  }

  postEmployee(data: any) {
    return this.http.post<any>("http://localhost:8080/api/v1/employees", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getEmployee() {
    return this.http.get<any>("http://localhost:8080/api/v1/employees")
      .pipe(map((res: any) => {


        return res;
      }))
  }

  updateEmployee(data: any, id: number) {
    return this.http.put<any>("http://localhost:8080/api/v1/employees" + "/" + id, data,{
      headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBamF5IiwiZXhwIjoxNjgxNDgyMjk0LCJpYXQiOjE2ODE0NDYyOTR9.a4hbAO0jGASUdAJKBJnBaiUl_MFApgWEpEAd8yx-NKo' }

    })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>("http://localhost:8080/api/v1/employees" + "/" + id, {
      headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBamF5IiwiZXhwIjoxNjgxNDgyMjk0LCJpYXQiOjE2ODE0NDYyOTR9.a4hbAO0jGASUdAJKBJnBaiUl_MFApgWEpEAd8yx-NKo' }

    })
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
