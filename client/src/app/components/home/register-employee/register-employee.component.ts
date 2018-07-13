import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ProjectsService } from '../../../services/projects.service'
import { Project } from '../../../models/project';


@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {

  @Input() project: any;

  form: FormGroup;
  processing;
  messageClass;
  message;

  constructor(private formBuilder: FormBuilder,
              private projectsService: ProjectsService) {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      role1: ['', Validators.required],
      role2: ['', Validators.required],
      role3: ['', Validators.required],
    });
  }

  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['role1'].disable();
    this.form.controls['role2'].disable();
    this.form.controls['role3'].disable();
  }

  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['role1'].enable();
    this.form.controls['role2'].enable();
    this.form.controls['role3'].enable();
  }

  onRegisterSubmit() {
    console.log("OnRegisterSubmit");


    let reqEmployee = {
      name: this.form.get('name').value,
      roles: this.getRoles(),
      projectId: this.project.projectId,
    }

    console.log(this.form);

    console.log(reqEmployee, " ", this.project);

    this.projectsService.registerProjectEmployee(reqEmployee).subscribe(data => {
      
      console.log("register employee:", data);
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

  getRoles() 
  {
    var roles = new Array<string>();
    
    this.form.get('role1').value == true ? roles.push("planejador") : "";
    this.form.get('role2').value == true ? roles.push("Supervisor") : "";
    this.form.get('role3').value == true ? roles.push("Colaborador Executor") : "" ;
    
    return roles;
  }
}
