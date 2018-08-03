import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedProject } from './../../../providers/sharedProject';
import { ProjectsService } from '../../../services/projects.service'
import { Project } from "./../../../models/project";
import { ForgeService } from '../../../services/forge.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project;

  registerOptions = {
    employee: false,
    services: false,
    equipments: false,
    material: false,
    task: false,
  }

  constructor(private _project: SharedProject,
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private forgeService: ForgeService) { }

  ngOnInit() {

    var projectId = this.route.snapshot.paramMap.get('id');
    console.log(projectId);

    if (projectId) {
      this.projectsService.getProjectById(projectId).subscribe(data => {
        this.project = data;

        console.log("http data", this.project);

        this.forgeService.getTranslationStatus(this.project.objectKey.replace("=", "")).subscribe(data => {
          console.log("translation status", data);
        });

      });


    }

  }

  onRemoveProjectClick() {
    this.projectsService.removeProject(this.project.id).subscribe(data => {
      this.router.navigate(['home'])
    });
  }

  onRegisterEmployeeProject() {
    this.registerOptions.employee = true;
    this.registerOptions.equipments = false;
    this.registerOptions.material = false;
    this.registerOptions.services = false;
    this.registerOptions.task = false;
  }

  onRegisterServicesProject() {
    this.registerOptions.employee = false;
    this.registerOptions.equipments = false;
    this.registerOptions.material = false;
    this.registerOptions.services = true;
    this.registerOptions.task = false;
  }

  onRegisterMaterialsProject() {
    this.registerOptions.employee = false;
    this.registerOptions.equipments = false;
    this.registerOptions.material = true;
    this.registerOptions.services = false;
    this.registerOptions.task = false;
  }

  onRegisterEquipmentsProject() {
    this.registerOptions.employee = false;
    this.registerOptions.equipments = true;
    this.registerOptions.material = false;
    this.registerOptions.services = false;
    this.registerOptions.task = false;
  }


  onRegisterTaskProject() {
    this.registerOptions.task = true;
    this.registerOptions.employee = false;
    this.registerOptions.equipments = false;
    this.registerOptions.material = false;
    this.registerOptions.services = false;
  }

  // ngAfterViewInit() {
  //   this.project = this._project.projectData;
  // }

}
