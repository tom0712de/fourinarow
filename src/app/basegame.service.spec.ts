import { TestBed } from '@angular/core/testing';

import { BasegameService } from './basegame.service';

describe('BasegameService', () => {
  let service: BasegameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasegameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
