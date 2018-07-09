import { TestBed, inject } from '@angular/core/testing';

import { ForgeService } from './forge.service';

describe('ForgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgeService]
    });
  });

  it('should be created', inject([ForgeService], (service: ForgeService) => {
    expect(service).toBeTruthy();
  }));
});
