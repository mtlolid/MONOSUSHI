import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductCategoryInfoComponent } from "./product-category-info/product-category-info.component";
import { RollsComponent } from "./rolls/rolls.component";
import { SetsComponent } from "./sets/sets.component";
import { DrinksComponent } from "./drinks/drinks.component";
import { SaucesComponent } from "./sauces/sauces.component";
import { ProductCategoryComponent } from "./product-category.component";

import { ProductService } from "../../shared/services/product/product.service";

const routes: Routes = [
  {
    path: '', component: ProductCategoryComponent, children: [
      { path: "rolls", component: RollsComponent },
      { path: "sets", component: SetsComponent },
      { path: "drinks", component: DrinksComponent },
      { path: "sauces", component: SaucesComponent }
    ]
  },
  {
    path: ':category/:id',
    resolve: { productInfo: ProductService },
    component: ProductCategoryInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
