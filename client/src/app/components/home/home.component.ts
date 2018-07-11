import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectsService } from './../../services/projects.service'
import { ForgeService } from './../../services/forge.service'

import { SharedProject } from "./../../providers/sharedProject"
import { Project } from "./../../models/project";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: any;

  constructor(private projectsService: ProjectsService,
              private forgeService: ForgeService,
              private router: Router,
              private _project: SharedProject
            ) { }

  ngOnInit() {
    this.projectsService.getProjects().subscribe ( data => {
      this.projects = data;
      console.log(this.projects);
      //this.propData.propertyData = this.propeties;

      this.forgeService.createBucket(this.projects.name, "transient").subscribe(data => {
        console.log("createbucket", data);
      })

    });  
    


  }

  onRegisterProject() {
    this.router.navigate(['registerProject'])
  }  

  selectProject(property) 
  {
    this._project.projectData = property;
    this.projectsService.getInternProject(property);
    console.log("propertyName:", property);
    this.router.navigate(['/project', property.projectId]);
  }
}
