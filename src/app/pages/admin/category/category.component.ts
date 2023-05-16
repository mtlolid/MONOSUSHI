import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryPost } from 'src/app/shared/interfaces/category.interface';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ImagesService } from 'src/app/shared/images/images.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  
  public categoryForm !: FormGroup;
  public addCheck = false;
  public uploaded = false;
  public editStatus = false;
  public curentEditId = 0;
  public curentEditElem!: ICategoryPost;

  public categoryArray: Array<ICategoryPost> = [];


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private imageService: ImagesService,
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
    this.imageService.uploadPhoto('categories', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          photoHiden: data
        });
        this.uploaded = true;
      })
      .catch(err => {
        console.log(err)
      })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value
  };

  ngOnInit(): void {
    this.initCategoryForm();  
    this.getCategory();
  };

  

}
