import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from 'src/app/shared/data-service.service';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { IProductPost } from 'src/app/shared/product.interface';
import { ImagesService } from 'src/app/shared/images/images.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public productForm !: FormGroup;
  public addCheck = false;
  public editStatus = false;
  public curentEditId = 0;
  public curentEditElem!: IProductPost;
  public uploaded = false;


  public productArray: Array<IProductPost> = [];


  constructor(
    private fb: FormBuilder,
    private productService: DataServiceService,
    private imageService: ImagesService,
    private storage: Storage
  ) { };

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: ["Роли", Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredients: [null, Validators.required],
      mass: [null, Validators.required],
      price: [null, Validators.required],
      picture: [null],
      picturePath: [null, Validators.required]
    })
  };

  changeAddCheck(): void {
    this.addCheck = !this.addCheck;
  };

  getProduct(): void {
    this.productService.getAllProducts().subscribe(
      data => { this.productArray = data }
    )
  };

  createProduct(): void {
    if (this.editStatus) {
      const product: IProductPost = {
        id: this.curentEditElem.id,
        category: this.productForm.value.category,
        name: this.productForm.value.name,
        path: this.productForm.value.path,
        ingredients: this.productForm.value.ingredients,
        mass: this.productForm.value.mass,
        price: this.productForm.value.price,
        picturePath: this.productForm.value.picturePath
      }
      
      this.productService.updateProduct(product, this.curentEditId).subscribe(
        () => this.getProduct()
      )
    }
    else {
      const product: IProductPost = {
        id: this.productArray.length + 1,
        category: this.productForm.value.category,
        name: this.productForm.value.name,
        path: this.productForm.value.path,
        ingredients: this.productForm.value.ingredients,
        mass: this.productForm.value.mass,
        price: this.productForm.value.price,
        picturePath: this.productForm.value.picturePath
      }

      this.productService.createProduct(product).subscribe(
        () => {
          this.getProduct();
        })
    }

    this.editStatus = false;
    this.changeAddCheck();
    this.productForm.reset();

  };

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.getProduct())
  };

  editProduct(product: IProductPost): void {
    this.curentEditElem = product;

    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      ingredients: product.ingredients,
      mass: product.mass,
      price: product.price,
      picturePath: product.picturePath
    })

    this.editStatus = true;
    this.curentEditId = product.id;
    this.changeAddCheck();
  };

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadPhoto('categories', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          picturePath: data
        });
        this.uploaded = true;
      })
      .catch(err => {
        console.log(err)
      })
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value
  };

  ngOnInit(): void {
    this.getProduct();
    this.initProductForm();
  }


}
