import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { UserCabinetComponent } from './pages/user-cabinet/user-cabinet.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserDataComponent } from './pages/user-cabinet/user-data/user-data.component';
import { OrdersComponent } from './pages/user-cabinet/orders/orders.component';

import { UserGuard } from './shared/guards/user/user.guard';
import { AdminGuard } from './shared/guards/admin/admin.guard';



const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./pages/actions/actions.module').then(m => m.ActionsModule)
  },
  {
    path: 'product-category',
    loadChildren: () => import('./pages/product-category/product-category.module').then(m => m.ProductCategoryModule)
  },
  {
    path: 'dostavka-ta-oplata',
    loadChildren: () => import('./pages/dostavka-ta-oplata/dostavka-ta-oplata.module').then(m => m.DostavkaTaOplataModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'user-cabinet',
    loadChildren: () => import('./pages/user-cabinet/user-cabinet.module').then(m => m.UserCabinetModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
