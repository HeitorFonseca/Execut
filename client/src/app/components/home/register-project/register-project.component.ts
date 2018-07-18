import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ProjectsService } from '../../../services/projects.service'
import { ForgeService } from './../../../services/forge.service'

import { Project } from '../../../models/project';


@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.css']
})
export class RegisterProjectComponent implements OnInit {


  form: FormGroup;
  processing;
  messageClass;
  message;

  constructor(private formBuilder: FormBuilder,
              private projectsService: ProjectsService,
              private forgeService: ForgeService,
              private router: Router) 
  {  
    this.createForm(); // Create Login Form when component is constructed 
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log("OnRegisterSubmit");

    let reqProject = {
      Name: this.form.get('name').value,
      Address: this.form.get('address').value,
      Bimmodel: this.form.get('BIMModel').value,
      Users: [JSON.parse(localStorage.getItem('user')).Id]
    }

    console.log(reqProject);

    this.projectsService.registerProject(reqProject).subscribe(data => {
      
      console.log("register project:", data);
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        //this.authService.storeUserData(data.token, data.user);        

        

        // setTimeout(() => {
        //   this.router.navigate(['home']);
        // }, 300);
      }
    });


  }

  fileChange(event) {  
    let fileList: FileList = event.target.files;  

    console.log(fileList);

    // this.forgeService.uploadFile(fileList[0], "angulartest").subscribe(data => {
    //   console.log("uploadfile",data);
    // });
  }
  
  createForm()
  {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      BIMModel: ['',  Validators.required]
    });
  }

  disableForm()
  {
    this.form.controls['name'].disable();
    this.form.controls['address'].disable();
  }

  enableForm()
  {
    this.form.controls['name'].enable();
    this.form.controls['address'].enable();
  }
}
