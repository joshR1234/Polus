import { TestBed } from '@angular/core/testing';

import { UserFirstService } from './userFirst.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserFirstService = TestBed.get(UserFirstService);
    expect(service).toBeTruthy();
  });
});
