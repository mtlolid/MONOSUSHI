import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [
        HttpClientModule,
        AngularFireStorageModule
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: Storage, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
