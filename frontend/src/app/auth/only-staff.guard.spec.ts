import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyStaffGuard } from './only-staff.guard';

describe('OnlyStaffGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyStaffGuard]
    });
  });

  it('should ...', inject([OnlyStaffGuard], (guard: OnlyStaffGuard) => {
    expect(guard).toBeTruthy();
  }));
});
