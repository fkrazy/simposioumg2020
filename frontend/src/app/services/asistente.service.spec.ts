import { TestBed } from '@angular/core/testing';

import { AsistenteService } from './asistente.service';

describe('AsistenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsistenteService = TestBed.get(AsistenteService);
    expect(service).toBeTruthy();
  });
});
