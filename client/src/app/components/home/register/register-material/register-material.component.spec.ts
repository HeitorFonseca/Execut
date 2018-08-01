import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMaterialComponent } from './register-material.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterMaterialComponent', () => {
  let component: RegisterMaterialComponent;
  let fixture: ComponentFixture<RegisterMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMaterialComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule,
        HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
