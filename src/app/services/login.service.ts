import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  // Current user which is currently logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  // generate token

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // Login User: Set token to local storage

  public loginUser(token:any){
    localStorage.setItem("token",token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  // User is logged in or not 
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr==null || tokenStr==''){
        return false;
    }else{
      return true;
    }
  }

  // Logout: remove token from local storage

  public logout(){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return true;
  }

  // Get Token
  public getToken(){
    return localStorage.getItem("token");
  }

  // Set UserDetail
  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  // Get User

  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  // Get User role

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
