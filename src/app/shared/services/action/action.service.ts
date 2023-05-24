import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActionPost } from '../../interfaces/action.interface';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActionService implements Resolve<IActionPost> {

  public url = "http://localhost:3000/actions";

  constructor(
    private http: HttpClient
  ) { }

  getOneAction(id: number): Observable<IActionPost> {
    return this.http.get<IActionPost>(`${this.url}/${id}`);
  }

  getAllActions(): Observable<IActionPost[]> {
    return this.http.get<IActionPost[]>(this.url)
  };

  createAction(action: IActionPost): Observable<IActionPost> {
    return this.http.post<IActionPost>(this.url, action);
  };

  deleteAction(id: number): Observable<IActionPost[]> {
    return this.http.delete<IActionPost[]>(`${this.url}/${id}`);
  };

  updateAction(action: IActionPost, id: number): Observable<IActionPost> {
    return this.http.patch<IActionPost>(`${this.url}/${id}`, action)
  };

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IActionPost | Observable<IActionPost> | Promise<IActionPost> {
    return this.http.get<IActionPost>(`${this.url}/${route.paramMap.get('id')}`);
  };

}
