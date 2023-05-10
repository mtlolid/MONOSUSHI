import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { IActionPost } from './action.interface';
import { ICategoryPost } from './category.interface';
import { IProductPost } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private url = "http://localhost:3000/actions";
  private url2 = "http://localhost:3000/categories";
  private url3 = "http://localhost:3000/products";


  constructor(
    private http: HttpClient
  ) { }

  getAllActions(): Observable<IActionPost[]> {
    return this.http.get<IActionPost[]>(this.url)
  };

  getAllCategories(): Observable<ICategoryPost[]> {
    return this.http.get<ICategoryPost[]>(this.url2)
  };

  getAllProducts(): Observable<IProductPost[]> {
    return this.http.get<IProductPost[]>(this.url3)
  };

  createAction(action: IActionPost): Observable<IActionPost> {
    return this.http.post<IActionPost>(this.url, action);
  };

  createCategory(category: ICategoryPost): Observable<ICategoryPost> {
    return this.http.post<ICategoryPost>(this.url2, category);
  };

  createProduct(product: IProductPost): Observable<IProductPost> {
    return this.http.post<IProductPost>(this.url3, product);
  };

  deleteAction(id: number): Observable<IActionPost[]> {
    return this.http.delete<IActionPost[]>(`${this.url}/${id}`);
  };

  deleteCategory(id: number): Observable<ICategoryPost[]> {
    return this.http.delete<ICategoryPost[]>(`${this.url2}/${id}`);
  };

  deleteProduct(id: number): Observable<IProductPost[]> {
    return this.http.delete<IProductPost[]>(`${this.url3}/${id}`);
  };

  updateAction(action: IActionPost, id: number): Observable<IActionPost> {
    return this.http.patch<IActionPost>(`${this.url}/${id}`, action)
  }

  updateCategory(category: ICategoryPost, id: number): Observable<ICategoryPost> {
    return this.http.patch<ICategoryPost>(`${this.url2}/${id}`, category)
  }

  updateProduct(product: IProductPost, id: number): Observable<IProductPost> {
    return this.http.patch<IProductPost>(`${this.url3}/${id}`, product)
  }

}
