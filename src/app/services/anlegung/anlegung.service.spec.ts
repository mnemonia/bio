import { TestBed } from '@angular/core/testing';

import { AnlegungService } from './anlegung.service';

describe('AnlegungService', () => {
  let service: AnlegungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnlegungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
