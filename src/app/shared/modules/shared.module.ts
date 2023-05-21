import { NgModule } from '@angular/core'

// material
import { MatDialogModule } from '@angular/material/dialog';

// other modules
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const MATERIAL = [
    MatDialogModule
]

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule
    ],
    exports: [
        ...MATERIAL,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule
    ]
})
export class SharedModule { }
