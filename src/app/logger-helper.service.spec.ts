import { TestBed } from '@angular/core/testing';

import { LoggerHelperService } from './logger-helper.service';

describe('LoggerHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggerHelperService = TestBed.get(LoggerHelperService);
    expect(service).toBeTruthy();
  });
});
