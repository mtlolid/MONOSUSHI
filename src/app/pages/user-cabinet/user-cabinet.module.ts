import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCabinetComponent } from "./user-cabinet.component";
import { OrdersComponent } from "./orders/orders.component";
import { UserDataComponent } from "./user-data/user-data.component";

import { SharedModule } from "../../shared/modules/shared.module";
import { UserCabinetRoutingModule } from "./user-cabinet-routing.module";

@NgModule({
  declarations: [
    UserCabinetComponent,
    OrdersComponent,
    UserDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserCabinetRoutingModule
  ]
})
export class UserCabinetModule { }
