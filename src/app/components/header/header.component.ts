import { Component } from '@angular/core';
import { ICategoryPost } from 'src/app/shared/category.interface';
import { DataServiceService } from 'src/app/shared/data-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public categoryArray: Array<ICategoryPost> = [];

  constructor(
    private categoryService: DataServiceService
  ) { }

  goTo(link: string): string {
    return `product-category/${link}`
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => { this.categoryArray = data }
    )
  };

  public dropDownCheck = false;

  changeDropDown(): void {
    this.dropDownCheck = !this.dropDownCheck;
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
