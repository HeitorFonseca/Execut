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

  /* Employee */
  registerProjectEmployee(employee) {
    return this.http.post<any>(this.domain + 'project/registerEmployee', employee).pipe(map(res => res));
  }

  getEmployeesByProject(id): Observable<Project> {
    let params = new HttpParams();
    params = params.append('projectId', id);

    return this.http.get<Project>(this.domain + 'project/:id/employeer', {params: params}).pipe(map(res => res));
  }

  /* Material */
  registerProjectMaterial(material) {
    return this.http.post<any>(this.domain + 'project/registerMaterial', material).pipe(map(res => res));
  }

  getMaterialsByProject(id): Observable<Project> {
    let params = new HttpParams();
    params = params.append('projectId', id);

    return this.http.get<Project>(this.domain + 'project/:id/materials', {params: params}).pipe(map(res => res));
  }

  /* Service */
  registerProjectService(service){
    return this.http.post<any>(this.domain + 'project/registerService', service).pipe(map(res => res));
  }

  getServicesByProject(id): Observable<Project> {
    let params = new HttpParams();
    params = params.append('projectId', id);

    return this.http.get<Project>(this.domain + 'project/:id/services', {params: params}).pipe(map(res => res));
  }

  /* Equipment */
  registerProjectEquipment(equipment) {
    return this.http.post<any>(this.domain + 'project/registerEquipment', equipment).pipe(map(res => res));
  }

  getEquipmentsByProject(id): Observable<Project> {
    let params = new HttpParams();
    params = params.append('projectId', id);

    return this.http.get<Project>(this.domain + 'project/:id/equipments', {params: params}).pipe(map(res => res));
  }

  /* Get all status */

  getTaskStatus(): Observable<any> {
    return this.http.get<any>(this.domain + 'status/').pipe(map(res => res));
  }

  /* Tasks */
  registerTask(task){
    return this.http.post<any>(this.domain + 'project/registerTask', task).pipe(map(res => res));
  }

  getInternProject(project) {
    this.sharedProject.next(project);
  }

}
