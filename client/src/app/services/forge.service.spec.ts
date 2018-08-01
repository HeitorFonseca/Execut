import { TestBed, inject } from '@angular/core/testing';

import { ForgeService } from './forge.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('ForgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgeService],
      imports: [RouterTestingModule,
        HttpClientModule]
    });
  });

  it('should be created', inject([ForgeService], (service: ForgeService) => {
    expect(service).toBeTruthy();
  }));
});
