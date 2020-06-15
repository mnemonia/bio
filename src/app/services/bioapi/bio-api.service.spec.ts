import { TestBed } from '@angular/core/testing';

import { BioApiService } from './bio-api.service';

describe('BioApiService', () => {
  let service: BioApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BioApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
