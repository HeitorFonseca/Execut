import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 
                             'Access-Control-Allow-Origin': '*',
                             'Access-Control-Allow-Headers': '*',
                             'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                             'Content-Type': 'application/x-www-form-urlencoded', 
                            })
};

@Injectable({
  providedIn: 'root'
})

export class ForgeService {

  access_token: string;

  requestOptions:any;

  constructor(private http: HttpClient, 
              private router: Router) { }

              
  

  authenticate() {

      console.log(httpOptions);

    let params = new HttpParams();
    params = params.append('client_id', "aAqXdFKEQm25gTRQMVjdaGxvYSMxuLl0");
    params = params.append('client_secret', "ENgGD2bgtcuRun6M");
    params = params.append('grant_type', "client_credentials");
    params = params.append('scope', "data:read bucket:create bucket:read data:write");

    return this.http.post(environment.forgeAuthenticationUrl, params, httpOptions).pipe(map(res => res));

  }

  loadToken() {
    const token = localStorage.getItem('access_token');
    this.access_token = token;
  }
}
