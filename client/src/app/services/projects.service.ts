import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    private router: Router) { }

  // Function to get projects
  getProjects() {
    return this.http.get(this.domain + 'project/').pipe(map(res => res));
  }

  // Function to register projects
  registerProject(file:File, project) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const fd = new FormData();
    fd.append('fileToUpload', file, file.name);
    fd.append('name', project.name);
    fd.append('address', project.address);
    fd.append('bucketKey', project.bucketName);
    fd.append('users', project.users);

    return this.http.post<any>(this.domain + 'project/register', fd, { headers: headers }).pipe(map(res => res));
  }

  removeProject(id) {
    console.log("delete Project: ", id)
    return this.http.delete(this.domain + 'project/' + id).pipe(map(res => res));
  }

  // Function to get project by name
  getProjectById(id): Observable<Project> {
    return this.http.get<Project>(this.domain + 'project/' + id).pipe(map(res => res));
  }

  /* Employee */
  registerProjectEmployee(employee) {
    return this.http.post<any>(this.domain + 'project/registerEmployee', employee).pipe(map(res => res));
  }

  getEmployeesByProject(projectId): Observable<any> {
    return this.http.get<any>(this.domain + 'project/'+ projectId + '/employeer').pipe(map(res => res));
  }

  removeEmployee(id) {
    console.log("delete Employee: ", id)
    return this.http.delete<any>(this.domain + 'project/employeer/' + id).pipe(map(res => res));
  }

  /* Material */
  registerProjectMaterial(material) {
    return this.http.post<any>(this.domain + 'project/registerMaterial', material).pipe(map(res => res));
  }

  getMaterialsByProject(projectId): Observable<any> {
    return this.http.get<any>(this.domain + 'project/' + projectId + '/materials').pipe(map(res => res));
  }

  editMaterial(material) {
    console.log("edit Material", material);
    return this.http.put<any>(this.domain + 'project/:id/materials/:id', material).pipe(map(res => res));
  }

  removeMaterial(materialId) {
    console.log("remove Material", materialId);
    return this.http.delete<any>(this.domain + 'project/materials/' + materialId).pipe(map(res => res));
  }

  /* Service */
  registerProjectService(service){
    return this.http.post<any>(this.domain + 'project/registerService', service).pipe(map(res => res));
  }

  getServicesByProject(projectId): Observable<any> {
    return this.http.get<any>(this.domain + 'project/' + projectId +'/services').pipe(map(res => res));
  }

  removeService(id) {
    console.log("delete service: ", id)
    return this.http.delete<any>(this.domain + 'project/services/' + id).pipe(map(res => res));
  }

  /* Equipment */
  registerProjectEquipment(equipment) {
    return this.http.post<any>(this.domain + 'project/registerEquipment', equipment).pipe(map(res => res));
  }

  getEquipmentsByProject(projectId): Observable<any> {
    return this.http.get<any>(this.domain +  'project/' + projectId +'/equipments').pipe(map(res => res));
  }

  removeEquipment(id) {
    console.log("delete Equipment: ", id)
    return this.http.delete<any>(this.domain + 'project/equipments/' + id).pipe(map(res => res));
  }

  /* Get all status */
  getTaskStatus(): Observable<any> {
    return this.http.get<any>(this.domain + 'status/').pipe(map(res => res));
  }

  /* Tasks */
  registerTask(task){
    return this.http.post<any>(this.domain + 'project/registerTask', task).pipe(map(res => res));
  }

  getTasks(projectId): Observable<any> {
    return this.http.get<any>(this.domain +  'project/' + projectId +'/tasks').pipe(map(res => res));
  }

  removeTasks(taskId): Observable<any> {
    return this.http.delete(this.domain + 'project/task/' + taskId).pipe(map(res => res));
  }

  getInternProject(project) {
    
    this.sharedProject.next(project);
  }

}
