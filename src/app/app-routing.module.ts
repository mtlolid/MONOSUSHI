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


const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "actions", component: ActionsComponent },
  { path: "product-category", component: ProductCategoryComponent, children: [
    { path: "rolls", component: RollsComponent },
    { path: "sets", component: SetsComponent },
    { path: "drinks", component: DrinksComponent },
    { path: "sauces", component: SaucesComponent }
  ] },
  { path: "dostavka-ta-oplata", component: DostavkaTaOplataComponent },
  { path: "about-us", component: AboutUsComponent },
  {
    path: "admin", component: AdminComponent, children: [
      { path: "actions", component: ActionComponent },
      { path: "category", component: CategoryComponent },
      { path: '', pathMatch: 'full', redirectTo: 'category' }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
