import { Component } from '@angular/core';
import { IActionPost } from 'src/app/shared/interfaces/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  public actionsArray: Array<IActionPost> = [];

  constructor(
    private actionService: ActionService
  ){}

  ngOnInit(): void {
    this.getActions();
  }

  getActions(): void {
    this.actionService.getAllActions().subscribe(
      data => { this.actionsArray = data }
    )
  };

}
