import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from "./../models/user";
import { Project } from "./../models/project";


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private sharedProject = new BehaviorSubject('default message');
  currentProject = this.sharedProject.asObservable();

  domain = "http://localhost:3000/api/";

  constructor(private http: HttpClient, 
    private router: Router, ) { }

  // Function to get projects
  getProjects() {
    return this.http.get(this.domain + 'project/').pipe(map(res => res));
  }

  // Function to register projects
  registerProject(project) {
    return this.http.post<any>(this.domain + 'project/register', project).pipe(map(res => res));
  }

   // Function to get project by name
   getProjectByName(id): Observable<Project> {
    let params = new HttpParams();
    params = params.append('projectId', id);

    return this.http.get<Project>(this.domain + 'project/id', {params: params}).pipe(map(res => res));
  }

  registerProjectEmployee(employee) {
    return this.http.post<any>(this.domain + 'project/registerEmployee', employee).pipe(map(res => res));
  }

  registerProjectMaterial(material) {
    return this.http.post<any>(this.domain + 'project/registerMaterial', material).pipe(map(res => res));
  }

  registerProjectService(service){
    return this.http.post<any>(this.domain + 'project/registerService', service).pipe(map(res => res));
  }

  registerProjectEquipment(equipment) {
    return this.http.post<any>(this.domain + 'project/registerEquipment', equipment).pipe(map(res => res));
  }

  getInternProject(project) {
    this.sharedProject.next(project);
  }

}
