import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsComponent } from "./actions.component";
import { ActionsInfoComponent } from "./actions-info/actions-info.component";

import { SharedModule } from "../../shared/modules/shared.module";
import { ActionsRoutingModule } from "./actions-routing.module";

@NgModule({
  declarations: [
    ActionsComponent,
    ActionsInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ActionsRoutingModule
  ]
})
export class ActionsModule { }
