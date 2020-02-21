import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyAsistentesGuard } from './only-asistentes.guard';

describe('OnlyAsistentesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyAsistentesGuard]
    });
  });

  it('should ...', inject([OnlyAsistentesGuard], (guard: OnlyAsistentesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
