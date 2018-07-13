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

  getAccessToken() {

    return this.http.get<any>(environment.domain + "forge/oauth/token").pipe(map(res => res));
  }

  uploadFile(file: File, bucketKey) {

    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const fd = new  FormData();
    fd.append('fileToUpload', file, file.name);
    fd.append('bucketKey', bucketKey);

    return this.http.post(environment.domain + "forge/oss/objects", fd, {headers: headers} ).pipe(map(res => res));
  }

  createBucket(bucketName, policy) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams();
    params.append("bucketKey", bucketName);
    params.append("policyKey", policy);

    return this.http.post(environment.domain + "forge/oss/buckets", params, {headers: headers} ).pipe(map(res => res));
  }

  loadToken() {
    const token = localStorage.getItem('access_token');
    this.access_token = token;
  }

  
}
