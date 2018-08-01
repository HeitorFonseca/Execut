import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmployeeComponent } from './register-employee.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterEmployeeComponent', () => {
  let component: RegisterEmployeeComponent;
  let fixture: ComponentFixture<RegisterEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEmployeeComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule,
        HttpClientModule]
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
});
