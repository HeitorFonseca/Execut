import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ProjectsService } from '../../../services/projects.service'
import { Project } from '../../../models/project';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  form:FormGroup;
  employees:any;
  services:any;
  equipments:Array<any> = [];
  materials: Array<any> = [];
  stati: Array<any> = [];

  selectedEmployeer;
  selectedService;

  messageClass;
  message;

  constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService) {

    this.form = this.formBuilder.group({
      //name: ['', Validators.required],
      description: ['', Validators.required],     
      employee: ['', Validators.required ],     
      service: ['', Validators.required],
      status:['', Validators.required],
      initialDate:['', Validators.required],
      finalDate:['', Validators.required],
    });
    
   }

  ngOnInit() {
    console.log("entrou em task");

    this.projectsService.getTaskStatus().subscribe( data => {
      console.log("get ALL STATUS");
      this.stati = data;     
    })

    this.projectsService.getEmployeesByProject(3).subscribe( data => {
      console.log("get employees by project")
      this.employees = data;
      console.log(data);
    })

    this.projectsService.getServicesByProject(3).subscribe( data => {
      console.log("get services by project");
      this.services = data;
      console.log(data);
    });

    this.projectsService.getMaterialsByProject(3).subscribe( data => {
      console.log("get materials by project");
      let materialsData:any = data;
      console.log(data);
      for(let m of materialsData) {
        this.materials.push({name:m.name, value:m.materialId, checked:false})
      }
    });

    this.projectsService.getEquipmentsByProject(3).subscribe( data => {
      console.log("get equipments by project");
      let equipmentsData:any = data;
      console.log(data);
      for(let m of equipmentsData) {
        this.equipments.push({name:m.name, value:m.equipmentId, checked:false})
      }
    });
  } 

  onClicked(array, option, event) {
    console.log(array, option);
    for (var i = 0; i < array.length; i++) {        
        if (array[i].value == option.value) {
          array[i].checked = event.target.checked;
            console.log("after update of checkbox " + i + " " + array[i].checked);
        }
    }
  }

  onRegisterTaks() {

    let materialList:Array<any> = [];
    let equipmentList:Array<any> = [];

    for (var i = 0; i < this.materials.length; i++) {
      if (this.materials[i].checked) {
        materialList.push(this.materials[i].value);
      }
    }

    for (var i = 0; i < this.equipments.length; i++) {
      if (this.equipments[i].checked) {
        equipmentList.push(this.equipments[i].value);
      }
    }

    console.log("Register task: ", this.form.get('employee').value + " " + this.form.get('service').value + " ");

    let initDt = this.form.get('initialDate').value;
    let finDt = this.form.get('finalDate').value;
    // this.property.AreasOverlay[this.property.AreasOverlay.length-1].HarvestDate = dt.year + "-" + dt.month + "-" + dt.day;

    let reqTask = {
      description: this.form.get('description').value,
      initialDate: initDt.year +  "-" + initDt.month + "-" + initDt.day,//this.form.get('initialDate').value,
      finalDate: finDt.year +  "-" + finDt.month + "-" + finDt.day, //this.form.get('finalDate').value,
      status: this.form.get('status').value,
      projectId: 3,
      employeeId: this.form.get('employee').value,
      serviceId: this.form.get('service').value,
      materialId: materialList,
      equipmentId: equipmentList
    }

    console.log("reqTask:", reqTask);
    this.projectsService.registerTask(reqTask).subscribe( data => {
      console.log("registrar task")
      
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;        
      }

    });
  }

}
