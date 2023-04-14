import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService:AuthService,private router:Router){
    
  }

  canActivate()
    {
    if (this._authService.isloggedin()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  } 
  
}
