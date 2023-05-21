import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DostavkaTaOplataComponent } from "./dostavka-ta-oplata.component";
import { SharedModule } from "../../shared/modules/shared.module";

import { DostavkaTaOplataRoutingModule } from "./dostavka-ta-oplata-routing.module";


@NgModule({
  declarations: [
    DostavkaTaOplataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DostavkaTaOplataRoutingModule
  ]
})
export class DostavkaTaOplataModule { }
