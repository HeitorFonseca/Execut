import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {

  form: FormGroup;
  processing;
  messageClass;
  message;

  constructor(private formBuilder: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }


  createForm()
  {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  disableForm()
  {
    this.form.controls['name'].disable();
    this.form.controls['role'].disable();
  }

  enableForm()
  {
    this.form.controls['name'].enable();
    this.form.controls['role'].enable();
  }

}
