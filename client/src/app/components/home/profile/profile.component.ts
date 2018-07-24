import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UserService } from '../../../services/user.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formUserData: FormGroup;
  formPassword: FormGroup;

  messageClass;
  message;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) {

    this.formUserData = this.formBuilder.group({
      name: [''],
      username: [''],
      email: ['']
    });

    this.formPassword = this.formBuilder.group({
      currentPassword: [''],
      newPassword: ['']
    });

  }

  ngOnInit() {

    this.userService.getUser().subscribe(data => {
      console.log("user: ", data);

      this.formUserData.setValue({
        name: data.user.name,
        email: data.user.email,
        username: data.user.username
      });
      
    });
  }

  editUser() {

    let user = {
      username: this.formUserData.get('username').value, // Username input field
      name: this.formUserData.get('name').value, // Password input field
      email: this.formUserData.get('email').value // Password input field

    }

    this.userService.updateUser(user).subscribe(data => {

      console.log("update user:", data);

      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;

      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
    });
  }


}
