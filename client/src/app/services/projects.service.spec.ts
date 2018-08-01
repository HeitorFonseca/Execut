import { TestBed, inject } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsService],
      imports: [RouterTestingModule,
        HttpClientModule]
    });
  });

  it('should be created', inject([ProjectsService], (service: ProjectsService) => {
    expect(service).toBeTruthy();
  }));
});
