import { TestBed } from '@angular/core/testing';

import { ReservacionService } from './reservacion.service';

describe('ReservacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservacionService = TestBed.get(ReservacionService);
    expect(service).toBeTruthy();
  });
});
