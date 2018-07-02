import { Component, OnInit } from '@angular/core';


import { ProjectsService } from '../../../services/projects.service'
import { Project } from '../../../models/project';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  employees:any;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    console.log("entrou em taskKKKKKKKKKKKKKKKKK");
    this.projectsService.getEmployeesByProject(3).subscribe( data => {
      this.employees = data;
      console.log(data);
    })
  }

}
