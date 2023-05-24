import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientModule } from '@angular/common/http';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be url', () => {
    expect(service.url).toBe('http://localhost:3000/categories')
  })

  it('should be object', () => {   
    let object = {};

    service.getAllCategories().subscribe((response) => object = response)
    expect(typeof(object)).toBe('object')
  })
});
