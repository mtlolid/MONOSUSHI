import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionPost } from 'src/app/shared/action.interface';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {

  public actionForm !: FormGroup;
  public addCheck = false;
  public uploadPercent !: number;
  public editStatus = false;
  private curentEditId = 0;
  private curentEditElem!: IActionPost;

  public actionArray: Array<IActionPost> = [];


  constructor(
    private fb: FormBuilder,
    private actionService: DataServiceService,
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
    this.uploadPhoto('actions', file.name, file)
      .then(data => {
        this.actionForm.patchValue({
          photoHiden: data
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  async uploadPhoto(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';

    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);

      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('error');
    }

    return Promise.resolve(url);

  };

  valueByControl(control: string): string {
    return this.actionForm.get(control)?.value
  };

  ngOnInit(): void {
    this.initActionForm();
    this.getActions();
  }



}
