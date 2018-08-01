import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'

import { ForgeViewerComponent } from './forge-viewer.component';
import { ForgeService } from '../../services/forge.service';
import { HttpClientModule } from '@angular/common/http';

declare const Autodesk: any;

describe('ForgeViewerComponent', () => {
  let component: ForgeViewerComponent;
  let fixture: ComponentFixture<ForgeViewerComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgeViewerComponent],
      imports: [ RouterTestingModule,
                 HttpClientModule ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
