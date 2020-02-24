import { TestBed } from '@angular/core/testing';

import { ConferencistaService } from './conferencista.service';

describe('ConferencistaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConferencistaService = TestBed.get(ConferencistaService);
    expect(service).toBeTruthy();
  });
});
