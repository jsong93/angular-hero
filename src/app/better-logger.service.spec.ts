import { TestBed } from '@angular/core/testing';

import { BetterLoggerService } from './better-logger.service';

describe('BetterLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BetterLoggerService = TestBed.get(BetterLoggerService);
    expect(service).toBeTruthy();
  });
});
