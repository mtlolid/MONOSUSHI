import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { IActionPost} from './action.interface';
import { ICategoryPost } from './category.interface';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private url = "http://localhost:3000/actions";
  private url2 = "http://localhost:3000/categories";
  
  constructor(
    private http: HttpClient
  ) { }

  getAllActions() : Observable<IActionPost[]>{
    return this.http.get<IActionPost[]>(this.url)
  };

  getAllCategories() : Observable<ICategoryPost[]>{
    return this.http.get<ICategoryPost[]>(this.url2)
  };

  createAction(action: IActionPost): Observable<IActionPost> {
    return this.http.post<IActionPost>(this.url, action);
  };

  createCategory(category: ICategoryPost): Observable<ICategoryPost> {
    return this.http.post<ICategoryPost>(this.url2, category);
  };

  deleteAction(id: number): Observable<IActionPost[]> {
    return this.http.delete<IActionPost[]>(`${this.url}/${id}`);
  };

  deleteCategory(id: number): Observable<ICategoryPost[]> {
    return this.http.delete<ICategoryPost[]>(`${this.url2}/${id}`);
  };

  updateAction(action: IActionPost, id: number): Observable<IActionPost> {
    return this.http.patch<IActionPost>(`${this.url}/${id}`, action)
  }

  updateCategory(category: ICategoryPost, id: number): Observable<ICategoryPost> {
    return this.http.patch<ICategoryPost>(`${this.url2}/${id}`, category)
  }

}
