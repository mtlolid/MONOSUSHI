import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionPost } from 'src/app/shared/interfaces/action.interface';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions-info',
  templateUrl: './actions-info.component.html',
  styleUrls: ['./actions-info.component.scss']
})
export class ActionsInfoComponent {

  public currentAction!: IActionPost;

  constructor(
    private actionService: ActionService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentAction = response['actionInfo'];
    }) 
  }

}
