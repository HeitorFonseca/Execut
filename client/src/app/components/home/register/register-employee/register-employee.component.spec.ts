import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RegisterEmployeeComponent } from './register-employee.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsService } from '../../../../services/projects.service';
import { Employee } from '../../../../models/employee';
import { Project } from '../../../../models/project';

describe('RegisterEmployeeComponent', () => {
  let component: RegisterEmployeeComponent;
  let fixture: ComponentFixture<RegisterEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEmployeeComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule,
        HttpClientModule],
        providers: [ProjectsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create employee', inject([ProjectsService], (service:ProjectsService) => {
    const compiled = fixture.debugElement.nativeElement;


    // let reqProject = {
    //   name: "project test",
    //   address: "address test",
    //   bucketName : "bucket name test",
    //   bimModel: "test.rvt",
    //   objectKey: "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZGVsZXRlYnVja2V0NTkyM2ZiMzFmMjlhM2Y3NmM5MTIxNmNhYWZkYTg1MGUvYmFzaWNhby5ydnQ=",
    //   users: ["5b5711d54ee3442e041decb0"]
    // }

    // service.registerProject().subscribe()

    let reqEmployee = {
      name: "Heitor Fonseca de Araujo",
      projectId: "5b621f763c330075dc0badc9",
    }


    service.registerProjectEmployee(reqEmployee).subscribe(data =>{

      console.log("Test:", data);
      expect(data.success).toBeTruthy();


    })

  }));

});
