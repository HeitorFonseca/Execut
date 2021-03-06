import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import {User} from "./../models/user";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  domain = "http://localhost:3000/api/";
  authToken;
  user;
  requestOptions;

  constructor(private http: HttpClient, 
              private router: Router, 
              private helper: JwtHelperService) { }

  // Function to register user accounts
  registerUser(user) {
    return this.http.post(this.domain + 'authentication/register', user).pipe(map(res => res));
  }

  // Function to check if username is taken
  checkUsername(username) {
    return this.http.get(this.domain + 'authentication/checkUsername/' + username).pipe(map(res => res));
  }

  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http.get(this.domain + 'authentication/checkEmail/' + email).pipe(map(res => res));
  }

  // Function to login user
  login(user) {
    console.log("auth service: Login");
    this.getLoggedInName.emit(user.Username);
    return this.http.post<any>(this.domain + 'authentication/login', user);
  }

  // Function to login user
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  // Function to store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  createAuthenticationHeaders() {
    this.loadToken();
    
    this.requestOptions = {
      params: new HttpParams()
    };

    this.requestOptions.params.set('Content-Type', 'application/json');
    this.requestOptions.params.set('authorization', this.authToken);
    
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  // Function to check if user is logged in
  loggedIn() {
    this.loadToken();
    
    console.log(this.authToken);
    console.log(this.helper.isTokenExpired(this.authToken));

    if (!this.helper.isTokenExpired(this.authToken))
    {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }

}
