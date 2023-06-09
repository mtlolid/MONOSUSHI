import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserCabinetComponent } from "./user-cabinet.component";
import { OrdersComponent } from "./orders/orders.component";
import { UserDataComponent } from "./user-data/user-data.component";
import { PasswordChangeComponent } from './password-change/password-change.component';

const routes: Routes = [
  {
    path: '', component: UserCabinetComponent, children: [
      { path: "user-data", component: UserDataComponent },
      { path: "orders", component: OrdersComponent },
      { path: "password-change", component: PasswordChangeComponent },
      { path: '', pathMatch: 'full', redirectTo: 'user-data' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCabinetRoutingModule { }
