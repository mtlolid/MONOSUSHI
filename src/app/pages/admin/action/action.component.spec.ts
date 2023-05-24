import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionComponent } from './action.component';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@angular/fire/storage';


describe('ActionComponent', () => {
  let component: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionComponent ],
      imports: [ HttpClientModule ],
      providers: [ 
        {provide: Storage, useValue: {}} 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
