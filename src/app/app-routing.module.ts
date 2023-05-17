import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActionsComponent } from './pages/actions/actions.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ActionComponent } from './pages/admin/action/action.component';
import { MainComponent } from './pages/main/main.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { RollsComponent } from './pages/product-category/rolls/rolls.component';
import { SetsComponent } from './pages/product-category/sets/sets.component';
import { DrinksComponent } from './pages/product-category/drinks/drinks.component';
import { SaucesComponent } from './pages/product-category/sauces/sauces.component';
import { ProductComponent } from './pages/admin/product/product.component';
import { ActionsInfoComponent } from './pages/actions-info/actions-info.component';
import { ActionService } from './shared/services/action/action.service';
import { ProductCategoryInfoComponent } from './pages/product-category-info/product-category-info.component';
import { ProductService } from './shared/services/product/product.service';
import { AdminGuard } from './shared/guards/admin/admin.guard';
import { UserCabinetComponent } from './pages/user-cabinet/user-cabinet.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserGuard } from './shared/guards/user/user.guard';



const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "actions", component: ActionsComponent },
  { path: "actions/:id", component: ActionsInfoComponent, resolve: {
    actionInfo: ActionService
  } },
  { path: "product-category", component: ProductCategoryComponent, children: [
    { path: "rolls", component: RollsComponent },
    { path: "sets", component: SetsComponent },
    { path: "drinks", component: DrinksComponent },
    { path: "sauces", component: SaucesComponent }
  ] },
  { path: "product-category/:category/:id", component: ProductCategoryInfoComponent, resolve: {
    productInfo: ProductService
  }},
  { path: "dostavka-ta-oplata", component: DostavkaTaOplataComponent },
  { path: "about-us", component: AboutUsComponent },
  {
    path: "admin", component: AdminComponent, canActivate:[AdminGuard],children: [
      { path: "actions", component: ActionComponent },
      { path: "category", component: CategoryComponent },
      { path: "product", component: ProductComponent },
      { path: '', pathMatch: 'full', redirectTo: 'category' }
    ]
  },
  { path: "login-page", component: LoginPageComponent },
  { path: "user-cabinet", canActivate:[UserGuard], component: UserCabinetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
