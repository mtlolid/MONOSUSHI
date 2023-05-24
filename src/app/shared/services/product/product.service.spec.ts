import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be url', () => {
    expect(service.url).toBe('http://localhost:3000/products')
  })

  it('should be object', () => {   
    let object = {};

    service.getAllProducts().subscribe((response) => object = response)
    expect(typeof(object)).toBe('object')
  })

});
