import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ProjectsService } from '../../../../services/projects.service'
import { Project } from '../../../../models/project';
import { Equipment } from '../../../../models/equipment';


@Component({
  selector: 'app-register-equipment',
  templateUrl: './register-equipment.component.html',
  styleUrls: ['./register-equipment.component.css']
})
export class RegisterEquipmentComponent implements OnInit {

  @Input() project: Project;

  form: FormGroup;
  processing;
  messageClass;
  message;

  equipments: Array<Equipment>;

  constructor(private formBuilder: FormBuilder,
    private projectsService: ProjectsService) {
    this.createForm();
  }

  ngOnInit() {

    console.log(this.project);
    if (this.project) {
      this.projectsService.getEquipmentsByProject(this.project.id).subscribe(data => {
        console.log("equipments", data);
        this.equipments = data as Array<Equipment>;
      });
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


    let reqEquipment = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      projectId: this.project.id
    }

    console.log(reqEquipment, " ", this.project);

    this.projectsService.registerProjectEquipment(reqEquipment).subscribe(data => {

      console.log("register Equipment:", data);
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

  removeEquipment(equipment:Equipment, index) {

    this.projectsService.removeEquipment(equipment.id).subscribe(data => {
      console.log("equipment deleted", data);

      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.equipments.splice(index, 1);        
      }  
    });
  }

  

}