import { TestBed } from '@angular/core/testing';

import { ConferenciaService } from './conferencia.service';

describe('ConferenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConferenciaService = TestBed.get(ConferenciaService);
    expect(service).toBeTruthy();
  });
});
