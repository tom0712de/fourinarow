import { TestBed } from '@angular/core/testing';

import { FeldClickService } from './feld-click.service';

describe('FeldClickService', () => {
  let service: FeldClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeldClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
