import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionPost } from 'src/app/shared/interfaces/action.interface';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ActionService } from 'src/app/shared/services/action/action.service';
import { ImagesService } from 'src/app/shared/images/images.service';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {

  public actionForm !: FormGroup;
  public addCheck = false;
  public uploaded = false;
  public editStatus = false;
  private curentEditId = 0;
  private curentEditElem!: IActionPost;

  public actionArray: Array<IActionPost> = [];


  constructor(
    private fb: FormBuilder,
    private actionService: ActionService,
    private imageService: ImagesService,
    private storage: Storage

  ) { };

  initActionForm(): void {
    this.actionForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      mainText: [null, Validators.required],
      photo: [null, Validators.required],
      photoHiden: [null]
    })
  };

  changeAddCheck(): void {
    this.addCheck = !this.addCheck;
  };

  getActions(): void {
    this.actionService.getAllActions().subscribe(
      data => { this.actionArray = data }
    )
  };

  createAction(): void {
    if (this.editStatus) {
      const action = {
        id: this.curentEditElem.id,
        date: this.curentEditElem.date,
        name: this.actionForm.value.name,
        title: this.actionForm.value.title,
        mainText: this.actionForm.value.mainText,
        picture: this.actionForm.value.photoHiden
      }

      this.actionService.updateAction(action, this.curentEditId).subscribe(
        () => this.getActions()
      )
    }
    else {
      const action = {
        id: this.actionArray.length + 1,
        date: Date().toString(),
        name: this.actionForm.value.name,
        title: this.actionForm.value.title,
        mainText: this.actionForm.value.mainText,
        picture: this.actionForm.value.photoHiden
      }

      this.actionService.createAction(action).subscribe(
        () => {
          this.getActions();
        })
    }

    this.editStatus = false;
    this.changeAddCheck();
    this.actionForm.reset();

  };

  deleteAction(id: number): void {
    this.actionService.deleteAction(id).subscribe(() => this.getActions())
  };

  editAction(action: IActionPost): void {
    this.curentEditElem = action;

    this.actionForm.patchValue({
      name: action.name,
      title: action.title,
      mainText: action.mainText,
      photoHiden: action.picture
    })
    this.editStatus = true;
    this.curentEditId = action.id;
    this.changeAddCheck();
  };

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadPhoto('actions', file.name, file)
      .then(data => {
        this.actionForm.patchValue({
          photoHiden: data
        });
        this.uploaded = true;
      })
      .catch(err => {
        console.log(err)
      })
  }

  

  valueByControl(control: string): string {
    return this.actionForm.get(control)?.value
  };

  ngOnInit(): void {
    this.initActionForm();
    this.getActions();
  }



}
