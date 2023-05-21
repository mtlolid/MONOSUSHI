import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActionsComponent } from "./actions.component";
import { ActionsInfoComponent } from "./actions-info/actions-info.component";

import { ActionService } from "../../shared/services/action/action.service";

const routes: Routes = [
  {
    path: '', component: ActionsComponent
  },
  {
    path: ':id',
    resolve: { actionInfo: ActionService },
    component: ActionsInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
