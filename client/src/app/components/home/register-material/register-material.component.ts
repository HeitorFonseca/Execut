import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ProjectsService } from '../../../services/projects.service'
import { Project } from '../../../models/project';
import { Material } from '../../../models/material';

@Component({
  selector: 'app-register-material',
  templateUrl: './register-material.component.html',
  styleUrls: ['./register-material.component.css']
})
export class RegisterMaterialComponent implements OnInit {


  @Input() project: Project;

  form: FormGroup;
  processing;
  messageClass;
  message;

  materials: Array<Material>;

  constructor(private formBuilder: FormBuilder,
    private projectsService: ProjectsService) {
    this.createForm();
  }

  ngOnInit() {
    if (this.project) {
      console.log("materials", this.project);
      this.projectsService.getMaterialsByProject(this.project._id).subscribe(data => {
        console.log("materials", data);
        this.materials = data as Array<Material>;
      })
    }
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


    let reqMaterial = {
      Name: this.form.get('name').value,
      Description: this.form.get('description').value,
      ProjectId: this.project._id
    }

    console.log(reqMaterial, " ", this.project);

    this.projectsService.registerProjectMaterial(reqMaterial).subscribe(data => {

      console.log("register employee:", data);
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

  editMaterial(material) {

  }

  removeMaterial(material) {

  }
}
