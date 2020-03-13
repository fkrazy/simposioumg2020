import { TestBed } from '@angular/core/testing';

import { EvaluacionReembolsoService } from './evaluacion-reembolso.service';

describe('EvaluacionReembolsoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluacionReembolsoService = TestBed.get(EvaluacionReembolsoService);
    expect(service).toBeTruthy();
  });
});
