import { TestBed } from '@angular/core/testing';

import { ImagesService } from './images.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireStorageModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: Firestore, useValue: {} }
      ]
    });
    service = TestBed.inject(ImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
