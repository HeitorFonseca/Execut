import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProjectComponent } from './project.component';
import { RegisterEmployeeComponent } from '../register/register-employee/register-employee.component';
import { RegisterEquipmentComponent } from '../register/register-equipment/register-equipment.component';
import { RegisterMaterialComponent } from '../register/register-material/register-material.component';
import { RegisterProjectComponent } from '../register/register-project/register-project.component';
import { RegisterServiceComponent } from '../register/register-service/register-service.component';

import { TaskComponent } from '../task/task.component';
import { ForgeViewerComponent } from '../../forge-viewer/forge-viewer.component';
import { SharedProject } from '../../../providers/sharedProject';
import { ProjectsService } from '../../../services/projects.service';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectComponent,
        RegisterEmployeeComponent,
        RegisterEquipmentComponent,
        RegisterMaterialComponent,
        RegisterProjectComponent,
        RegisterServiceComponent,
        TaskComponent,
        ForgeViewerComponent],
        
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule,
        HttpClientModule , NgbModule],
        providers: [ SharedProject, ProjectsService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
