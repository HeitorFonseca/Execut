import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ProjectsService } from '../../../services/projects.service'
import { Project } from '../../../models/project';
import { Employee } from '../../../models/employee';
import { Equipment } from '../../../models/equipment';
import { Material } from '../../../models/material';
import { Service } from '../../../models/service';
import { Task } from '../../../models/task';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnChanges {

  @Input() project: Project;

  objectsIds: Array<any>;

  form:FormGroup;
  employees:Array<Employee>;
  services:Array<Service>;
  equipments:Array<any> = [];
  materials: Array<any> = [];
  stati: Array<any> = [];
  tasks: Array<Task>;
  
  selectedEmployeer;
  selectedService;
  selectedBIMObjs;
  messageClass;
  message;

  lock = false;

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
    console.log("entrou em task", this.project.id);
    if (this.project && !this.lock) {
      this.getAllFieldsFromProject();

      this.projectsService.getTasks(this.project.id).subscribe( data => {
        console.log("tasks", data);

        this.tasks = data as Array<Task>;
      });
    }
  } 

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes:", changes);
    if (changes['project']) {
      let varChange = changes['project'];
      this.project = varChange.currentValue;
      this.getAllFieldsFromProject();

      this.projectsService.getTasks(this.project.id).subscribe( data => {
        console.log("tasks:", data);

        this.tasks = data as Array<Task>;
      });
    }
  }

  getAllFieldsFromProject(){
    this.lock = true;
    this.equipments = [];
    this.materials = [];

    this.projectsService.getTaskStatus().subscribe( data => {
      console.log("get status");
      this.stati = data;     
      console.log(data);
    })

    this.projectsService.getEmployeesByProject(this.project.id).subscribe( data => {
      console.log("get employees by project")
      this.employees = data;
      console.log(data);
    })

    this.projectsService.getServicesByProject(this.project.id).subscribe( data => {
      console.log("get services by project");
      this.services = data;
      console.log(data);
    });

    this.projectsService.getMaterialsByProject(this.project.id).subscribe( data => {
      console.log("get materials by project");
      let materialsData:any = data;
      console.log(data);
      for(let m of materialsData) {
        this.materials.push({name:m.name, value:m.id, checked:false})
      }
    });

    this.projectsService.getEquipmentsByProject(this.project.id).subscribe( data => {
      console.log("get equipments by project");
      let equipmentsData:any = data;
      console.log(data);
      for(let m of equipmentsData) {
        this.equipments.push({name:m.name, value:m.id, checked:false})
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
  
  receiverSelectedObjects(selectedObjects) {
    this.selectedBIMObjs = selectedObjects;
    console.log('Foi emitido o evento e chegou no pai >>>> ', selectedObjects);
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
      projectId: this.project.id,
      employeeId: this.form.get('employee').value,
      serviceId: this.form.get('service').value,
      materialId: materialList,
      equipmentId: equipmentList,
      forgeObjs: this.selectedBIMObjs
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

  removeTask(task:Task, index) {
    console.log(task, index);
    this.projectsService.removeTasks(task.id).subscribe(data => {

      console.log("Remover tarefa:", data);

      if(!data.success){

      }
      else {
        this.tasks.splice(index, 1);
      }
    })
  }

  editTask(task:Task) {
    
    let objsId = [];

    for( let objId of task.forgeObjs) {
      objsId.push(+objId.dbId);
    }

    this.objectsIds = objsId;
  }

}
