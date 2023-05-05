import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryPost } from 'src/app/shared/category.interface';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  
  public categoryForm !: FormGroup;
  public addCheck = false;
  public uploadPercent !: number;
  public editStatus = false;
  public curentEditId = 0;
  public curentEditElem!: ICategoryPost;

  public categoryArray: Array<ICategoryPost> = [];


  constructor(
    private fb: FormBuilder,
    private categoryService: DataServiceService,
    private storage: Storage
  ){};

  initCategoryForm(): void{
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      photo: [null, Validators.required],
      photoHiden: [null]
    })
  };

  changeAddCheck(): void {
    this.addCheck = !this.addCheck;
  };

  getCategory(): void {
    this.categoryService.getAllCategories().subscribe(
      data => { this.categoryArray = data }
    )
  };

  createCategory(): void {
    if (this.editStatus) {
      const category = {
        id: this.curentEditElem.id,
        name: this.categoryForm.value.name,
        path: this.categoryForm.value.path,
        picture: this.categoryForm.value.photoHiden
      }

      this.categoryService.updateCategory(category, this.curentEditId).subscribe(
        () => this.getCategory()
      )
    }
    else {
      const category = {
        id: this.categoryArray.length + 1,
        name: this.categoryForm.value.name,
        path: this.categoryForm.value.path,
        picture: this.categoryForm.value.photoHiden
      }

      this.categoryService.createCategory(category).subscribe(
        () => {
          this.getCategory();
        })
    }

    this.editStatus = false;
    this.changeAddCheck();
    this.categoryForm.reset();

  };

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => this.getCategory())
  };

  editCategory(category: ICategoryPost): void {
    this.curentEditElem = category;

    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      photoHiden: category.picture
    })
    this.editStatus = true;
    this.curentEditId = category.id;
    this.changeAddCheck();
  };

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadPhoto('categories', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
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
    return this.categoryForm.get(control)?.value
  };

  ngOnInit(): void {
    this.initCategoryForm();  
    this.getCategory();
  };

  

}
