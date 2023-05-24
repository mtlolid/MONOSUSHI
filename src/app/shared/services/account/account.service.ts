import { Injectable } from '@angular/core';
import { IAccount } from '../../interfaces/account.interface';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isUserLogin$ = new Subject<boolean>();
  public isLogined = false;
  public url = "http://localhost:3000/users";

  constructor(
    private http: HttpClient
  ) { }

  login(credential: IAccount): Observable<any>{
    return this.http.get(`${this.url}?email=${credential.login}&password=${credential.password}`);
  }
}
