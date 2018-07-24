import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ProjectsService } from '../../../../services/projects.service'
import { Project } from '../../../../models/project';
import { Service } from '../../../../models/service';

@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrls: ['./register-service.component.css']
})
export class RegisterServiceComponent implements OnInit {


  @Input() project: Project;

  form: FormGroup;
  processing;
  messageClass;
  message;

  services: Array<Service>;

  constructor(private formBuilder: FormBuilder,
              private projectsService: ProjectsService) {
    this.createForm();
  }

  ngOnInit() {
    this.projectsService.getServicesByProject(this.project.id).subscribe(data => {
      console.log("services", data);
      this.services = data as Array<Service>;
    });
  }


  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],     
    });

  }

  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['description'].disable(); 
  }

  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['description'].enable();
  }


  onRegisterSubmit() {
    console.log("OnRegisterSubmit");


    let reqService = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      projectId: this.project.id
    }

    console.log(reqService, " ", this.project);

    this.projectsService.registerProjectService(reqService).subscribe(data => {
      
      console.log("register service:", data);
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;        
      }
    });
  }

}