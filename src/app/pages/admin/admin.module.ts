import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from "./admin.component";
import { ActionComponent } from "./action/action.component";
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";

import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../../shared/modules/shared.module";

@NgModule({
  declarations: [
    AdminComponent,
    ActionComponent,
    CategoryComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
