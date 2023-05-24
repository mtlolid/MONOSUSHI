import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientModule } from '@angular/common/http';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be url', () => {
    expect(service.url).toBe('http://localhost:3000/users')
  })

  it('should be object', () => {
    expect(typeof(service.isUserLogin$)).toBe('object') 
  })

  it('should be boolean', () => {
    expect(typeof(service.isLogined)).toBe('boolean') 
  })

});
