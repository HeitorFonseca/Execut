import { Injectable } from '@angular/core';

import { Project } from './../models/project'

@Injectable() 
export class SharedProject {
    projectData: Project;  
}

