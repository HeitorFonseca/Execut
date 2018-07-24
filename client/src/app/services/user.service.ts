import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  domain = "http://localhost:3000/api/";


  constructor(private http: HttpClient, 
    private router: Router) { }

  // Function to get properties
  getUser() {
    return this.http.get<any>(this.domain + 'user/').pipe(map(res => res));
  }

  updateUser(user) {
    console.log("edit user called", user);
    return this.http.put<any>(this.domain + 'user/', user).pipe(map(res => res));
  }

  changePassword(newPassword) {
    return this.http.patch<any>(this.domain + 'user/', newPassword).pipe(map(res => res));
  }


}
