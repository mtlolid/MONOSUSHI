import { Component } from '@angular/core';
import { IActionPost } from 'src/app/shared/action.interface';
import { DataServiceService } from 'src/app/shared/data-service.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  public actionsArray: Array<IActionPost> = [];

  constructor(
    private actionService: DataServiceService
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
