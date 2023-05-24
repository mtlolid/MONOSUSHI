import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductPost } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/order/order.service';

@Component({
  selector: 'app-product-category-info',
  templateUrl: './product-category-info.component.html',
  styleUrls: ['./product-category-info.component.scss']
})
export class ProductCategoryInfoComponent {

  public currentProduct!: IProductPost;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response['productInfo'];
    }) 
  }

  productCount(product: IProductPost, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

  addToBasket(product: IProductPost): void {
    let basket: Array<IProductPost> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

}
