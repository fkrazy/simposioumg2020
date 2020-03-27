import { TestBed } from '@angular/core/testing';

import { ValidacionPagoService } from './validacion-pago.service';

describe('ValidacionPagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidacionPagoService = TestBed.get(ValidacionPagoService);
    expect(service).toBeTruthy();
  });
});
