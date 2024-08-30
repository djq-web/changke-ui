import { TestBed } from '@angular/core/testing';

import { ChangkeService } from './changke.service';

describe('ChangkeService', () => {
  let service: ChangkeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangkeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
