import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedProject } from './../../../providers/sharedProject';
import { ProjectsService } from '../../../services/projects.service'
import { Project } from "./../../../models/project";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: any;

  registerOptions = {
    employee: false,
    services: false,
    equipments: false,
    material: false,
  }

  constructor(private _project: SharedProject,
              private route: ActivatedRoute,
              private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.currentProject.subscribe(data => this.project = data)

    console.log("data:",this._project.projectData);

    var projectId = this.route.snapshot.paramMap.get('id');
    console.log(projectId);

    this.projectsService.getProjectByName(projectId).subscribe(data => {
      this.project = data;
      
      console.log("data res", this.project);     
    })
  }


  onRegisterEmployeeProject() {
    this.registerOptions.employee = true;
    this.registerOptions.equipments = false;
    this.registerOptions.material = false;
    this.registerOptions.services = false;
  }

  onRegisterServicesProject() {
    this.registerOptions.employee = false;
    this.registerOptions.equipments = false;
    this.registerOptions.material = false;
    this.registerOptions.services = true;
  }

  // ngAfterViewInit() {
  //   this.project = this._project.projectData;
  // }

}
