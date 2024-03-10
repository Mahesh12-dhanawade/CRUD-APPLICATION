import { TestBed } from '@angular/core/testing';

import { EmplyoeeService } from './emplyoee.service';

describe('EmplyoeeService', () => {
  let service: EmplyoeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmplyoeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
