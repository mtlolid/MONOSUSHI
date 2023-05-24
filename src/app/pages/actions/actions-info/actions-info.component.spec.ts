import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsInfoComponent } from './actions-info.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('ActionsInfoComponent', () => {
  let component: ActionsInfoComponent;
  let fixture: ComponentFixture<ActionsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsInfoComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
