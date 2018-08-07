import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { UUID } from 'angular2-uuid';

import { ProjectsService } from '../../../../services/projects.service'
import { ForgeService } from './../../../../services/forge.service'

import { Project } from '../../../../models/project';


@Component({
  selector: 'app-register-project',
  templateUrl: './register-project.component.html',
  styleUrls: ['./register-project.component.css']
})
export class RegisterProjectComponent implements OnInit {

  form: FormGroup;
  processing: false;
  messageClass;
  message;
  fileToUploadList: FileList;

  constructor(private formBuilder: FormBuilder,
    private projectsService: ProjectsService,
    private forgeService: ForgeService,
    private router: Router) {
    this.createForm(); // Create Login Form when component is constructed 
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log("OnRegisterSubmit");

    let bucketName: string = this.form.get('name').value + UUID.UUID().split('-').join('');
    bucketName = bucketName.split(' ').join('').toLowerCase();

    let reqProject = {
      name: this.form.get('name').value,
      address: this.form.get('address').value,
      bucketName: bucketName,
      users: [JSON.parse(localStorage.getItem('user')).id]
    }

    this.projectsService.registerProject(this.fileToUploadList[0], reqProject).subscribe(data => {
      console.log("register project:", data);

      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;

        let req = {
          bucketKey: "execut",
          objectName: data.project.objectKey.replace('=', '')
        }

        console.log(data);

        this.forgeService.translate(req).subscribe(data =>{
          console.log("translation", data);
        });

      }
    });


    // this.forgeService.createBucket(reqBucket).subscribe(dataBucket => {

    //   // If error when create bucket
    //   if (!dataBucket.success) {
    //     this.messageClass = 'alert alert-danger';
    //     this.message = dataBucket.message;
    //     this.processing = false;
    //     this.enableForm();
    //   }
    //   else {
    //     // Upload file
    //     this.forgeService.uploadFile(this.fileToUploadList[0], bucketName).subscribe(dataForge => {
    //       console.log("uploadfile", dataForge);

    //       if (!dataForge.success) {

    //         this.messageClass = 'alert alert-danger';
    //         this.message = dataForge.message;
    //         this.processing = false;
    //         this.enableForm();

    //         this.forgeService.deleteBucket(bucketName).subscribe(data => {
    //           console.log("bucket deleted", data);
    //         });

    //       } else {


    //         let req = {
    //           bucketKey: "execut",
    //           objectName: btoa(dataForge.object.body.objectId).replace('=', '')

    //         }

    //         console.log(req, dataForge.object.body.objectKey);

    //         this.forgeService.translate(req).subscribe(data => {
    //           console.log("translate: ", data);

    //           let reqProject = {
    //             name: this.form.get('name').value,
    //             address: this.form.get('address').value,
    //             bimModel: dataForge.object.body.objectKey,
    //             objectKey: btoa(dataForge.object.body.objectId),
    //             bucketName: bucketName,
    //             users: [JSON.parse(localStorage.getItem('user')).Id]
    //           }

    //           this.projectsService.registerProject(reqProject).subscribe(dataProj => {
    //             console.log("register project:", dataProj);

    //             if (!dataProj.success) {
    //               this.messageClass = 'alert alert-danger';
    //               this.message = dataProj.message;
    //               this.processing = false;
    //               this.enableForm();
    //             } else {
    //               this.messageClass = 'alert alert-success';
    //               this.message = dataProj.message;
    //             }
    //           });

    //         })

    //       }
    //     });

    //   }


    // });

  }

  fileChange(event) {
    this.fileToUploadList = event.target.files;

    console.log(this.fileToUploadList);
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      BIMModel: ['', Validators.required]
    });

    this.form
  }

  disableForm() {
    this.form.controls['name'].disable();
    this.form.controls['address'].disable();
  }

  enableForm() {
    this.form.controls['name'].enable();
    this.form.controls['address'].enable();
  }
}
