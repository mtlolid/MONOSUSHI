import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCabinetComponent } from './user-cabinet.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserCabinetComponent', () => {
  let component: UserCabinetComponent;
  let fixture: ComponentFixture<UserCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCabinetComponent ],
      imports: [ 
        HttpClientModule,
        RouterTestingModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
