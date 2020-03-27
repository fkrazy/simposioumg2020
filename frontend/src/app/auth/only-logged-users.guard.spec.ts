import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyLoggedUsersGuard } from './only-logged-users.guard';

describe('OnlyLoggedUsersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyLoggedUsersGuard]
    });
  });

  it('should ...', inject([OnlyLoggedUsersGuard], (guard: OnlyLoggedUsersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
