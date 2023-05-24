import { TestBed } from '@angular/core/testing';

import { ActionService } from './action.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { IActionPost } from '../../interfaces/action.interface';

describe('ActionService', () => {
  let service: ActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireStorageModule
      ],
      providers: [ 
        { provide: Storage, useValue: {} }
      ]
    });
    service = TestBed.inject(ActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be url', () => {
    expect(service.url).toBe('http://localhost:3000/actions')
  })

  it('should be object', () => {   
    let object = {};

    service.getAllActions().subscribe((response) => object = response)
    expect(typeof(object)).toBe('object')
  })

});
