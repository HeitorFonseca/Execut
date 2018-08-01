import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEquipmentComponent } from './register-equipment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterEquipmentComponent', () => {
  let component: RegisterEquipmentComponent;
  let fixture: ComponentFixture<RegisterEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEquipmentComponent ],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule,
        HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
