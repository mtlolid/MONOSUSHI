import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollsComponent } from './rolls.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('RollsComponent', () => {
  let component: RollsComponent;
  let fixture: ComponentFixture<RollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollsComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
