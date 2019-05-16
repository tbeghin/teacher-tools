import {TestBed, inject} from '@angular/core/testing';
import {AuthenticationGuard} from './authentication.guard';
import {Router} from '@angular/router';

describe('AuthGuard', () => {
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationGuard, {provide: Router, useValue: router}]
    });
  });

  it('should ...', inject([AuthenticationGuard], (guard: AuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
