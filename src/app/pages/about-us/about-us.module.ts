import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from "./about-us.component";

import { AboutUsRoutingModule } from "./about-us-routing.module";
import { SharedModule } from "../../shared/modules/shared.module";

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }

