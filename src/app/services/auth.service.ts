import {JwtHelper} from 'angular2-jwt';
import {tokenNotExpired} from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  
  constructor(private http: Http) {
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', 
      JSON.stringify(credentials))
      .map(response => {
        console.log(response.json());

         let result = response.json();
         if(result && result.token){

           localStorage.setItem('token',result.token);
           return true;
         }
         return false;
      });
  }

  logout() { 
    localStorage.removeItem('token');
  }

  isLoggedIn() { 
    
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');
    if(!token)
    return false;
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    console.log('expirationdate',expirationDate);
    console.log('isExpired',isExpired);
    return !isExpired;
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if (!token)
      return null;
    return new JwtHelper().decodeToken(token);
  }
}

