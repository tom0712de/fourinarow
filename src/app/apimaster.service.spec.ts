import { TestBed } from '@angular/core/testing';

import { APImasterService } from './apimaster.service';

describe('APImasterService', () => {
  let service: APImasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APImasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
