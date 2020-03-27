import { TestBed } from '@angular/core/testing';

import { CuentaService } from './cuenta.service';

describe('CuentaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaService = TestBed.get(CuentaService);
    expect(service).toBeTruthy();
  });
});
