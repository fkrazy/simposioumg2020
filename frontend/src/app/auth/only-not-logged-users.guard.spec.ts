import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyNotLoggedUsersGuard } from './only-not-logged-users.guard';

describe('OnlyNotLoggedUsersGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyNotLoggedUsersGuard]
    });
  });

  it('should ...', inject([OnlyNotLoggedUsersGuard], (guard: OnlyNotLoggedUsersGuard) => {
    expect(guard).toBeTruthy();
  }));
});
