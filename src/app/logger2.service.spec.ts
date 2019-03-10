import { TestBed } from '@angular/core/testing';

import { Logger2Service } from './logger2.service';

describe('Logger2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Logger2Service = TestBed.get(Logger2Service);
    expect(service).toBeTruthy();
  });
});
