import { TestBed } from '@angular/core/testing';

import { SbpService } from './sbp.service';

describe('SbpService', () => {
  let service: SbpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
