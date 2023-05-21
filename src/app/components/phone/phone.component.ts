import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent {

  constructor(
    private dialogRef: MatDialogRef<PhoneComponent>,
  ){}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
