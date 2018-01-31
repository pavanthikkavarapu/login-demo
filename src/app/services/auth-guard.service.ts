import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router : Router,
    private authservice : AuthService) { 

  }
  CanActivate(route, state:RouterStateSnapshot){
    if(this.authservice.isLoggedIn()) return true;
    this.router.navigate(['/login'], {queryParams:{returnUrl : state.url}});
    return false;
  }

}
