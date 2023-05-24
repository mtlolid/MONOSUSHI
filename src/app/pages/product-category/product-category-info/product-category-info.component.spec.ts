import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryInfoComponent } from './product-category-info.component';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('ProductCategoryInfoComponent', () => {
  let component: ProductCategoryInfoComponent;
  let fixture: ComponentFixture<ProductCategoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryInfoComponent ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
