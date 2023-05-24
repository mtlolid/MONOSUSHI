import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryPost } from '../../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public url = "http://localhost:3000/categories";

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories(): Observable<ICategoryPost[]> {
    return this.http.get<ICategoryPost[]>(this.url)
  };

  createCategory(category: ICategoryPost): Observable<ICategoryPost> {
    return this.http.post<ICategoryPost>(this.url, category);
  };

  deleteCategory(id: number): Observable<ICategoryPost[]> {
    return this.http.delete<ICategoryPost[]>(`${this.url}/${id}`);
  };

  updateCategory(category: ICategoryPost, id: number): Observable<ICategoryPost> {
    return this.http.patch<ICategoryPost>(`${this.url}/${id}`, category)
  };

}
