import { Component } from '@angular/core';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { IProductPost } from 'src/app/shared/product.interface';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.scss']
})
export class RollsComponent {

  public productArray: Array<IProductPost> = [];

  constructor(
    private productService: DataServiceService
  ) { }

  getProduct(): void {
    this.productService.getAllProducts().subscribe(
      data => { this.productArray = data }
    )
  };

  ngOnInit(): void {
    this.getProduct();
  }

}
