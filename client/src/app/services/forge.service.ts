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

    return this.http.post<any>(environment.domain + "forge/oss/objects", fd, {headers: headers} ).pipe(map(res => res));
  }

  createBucket(bucket) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<any>(environment.domain + "forge/oss/buckets", bucket, {headers: headers} ).pipe(map(res => res));
  }

  getBuckets(id) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<any>(environment.domain + "forge/oss/buckets", {params:params} ).pipe(map(res => res));
  }

  deleteBucket(id) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('bucketKey', id);

    return this.http.delete<any>(environment.domain + "forge/oss/buckets/:bucketKey", {params:params} ).pipe(map(res => res));
  }

  translate(req) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let dt = JSON.stringify({ 'bucketKey': "execut", 'objectName': "apartamento.rvt" })

    return this.http.post<any>(environment.domain + "forge/modelderivative/jobs", req, {headers: headers} ).pipe(map(res => res));
  }

  loadToken() {
    const token = localStorage.getItem('access_token');
    this.access_token = token;
  }

  
}
