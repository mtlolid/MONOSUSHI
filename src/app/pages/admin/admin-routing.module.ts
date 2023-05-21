import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ActionComponent } from "./action/action.component";
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";


const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: "category", component: CategoryComponent },
      { path: "actions", component: ActionComponent },
      { path: "product", component: ProductComponent },
      { path: '', pathMatch: 'full', redirectTo: 'category' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
