import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductPost } from '../../interfaces/product.interface';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements Resolve<IProductPost> {

  private url = "http://localhost:3000/products";

  constructor(
    private http: HttpClient
  ) { }

  getOneProduct(id: number): Observable<IProductPost> {
    return this.http.get<IProductPost>(`${this.url}/${id}`);
  }

  getAllProducts(): Observable<IProductPost[]> {
    return this.http.get<IProductPost[]>(this.url)
  };

  createProduct(product: IProductPost): Observable<IProductPost> {
    return this.http.post<IProductPost>(this.url, product);
  };

  deleteProduct(id: number): Observable<IProductPost[]> {
    return this.http.delete<IProductPost[]>(`${this.url}/${id}`);
  };

  updateProduct(product: IProductPost, id: number): Observable<IProductPost> {
    return this.http.patch<IProductPost>(`${this.url}/${id}`, product)
  };

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProductPost | Observable<IProductPost> | Promise<IProductPost> {
    return this.http.get<IProductPost>(`${this.url}/${route.paramMap.get('id')}`);
  };

}
