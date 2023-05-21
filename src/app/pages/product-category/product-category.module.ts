import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from "./product-category.component";
import { ProductCategoryInfoComponent } from "./product-category-info/product-category-info.component";
import { DrinksComponent } from "./drinks/drinks.component";
import { RollsComponent } from "./rolls/rolls.component";
import { SaucesComponent } from "./sauces/sauces.component";
import { SetsComponent } from "./sets/sets.component";

import { ProductCategoryRoutingModule } from "./product-category-routing.module";
import { SharedModule } from "../../shared/modules/shared.module";

@NgModule({
  declarations: [
    ProductCategoryComponent,
    ProductCategoryInfoComponent,
    DrinksComponent,
    RollsComponent,
    SaucesComponent,
    SetsComponent
  ],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    SharedModule
  ]
})
export class ProductCategoryModule { }
