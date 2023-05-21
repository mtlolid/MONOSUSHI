import { AccountService } from '../../shared/services/account/account.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ROLE } from 'src/app/shared/costants/roles.enum';
import { ICategoryPost } from 'src/app/shared/interfaces/category.interface';
import { IProductPost } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/order/order.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { DialogWindowComponent } from '../dialog-window/dialog-window.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public categoryArray: Array<ICategoryPost> = [];
  public checkOutCheck = false;
  public total = 0;
  public basket: Array<IProductPost> = [];
  public dropDownCheck = false;

  public isLogin = false;
  public loginUrl = '';

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
  }

  goTo(link: string): string {
    return `product-category/${link}`
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => { this.categoryArray = data }
    )
  };

  changeDropDown(): void {
    this.dropDownCheck = !this.dropDownCheck;
  };

  checkOutToggle(): void {
    this.checkOutCheck = !this.checkOutCheck;
  };

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductPost) => total + prod.count * prod.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductPost, value: boolean): void {
    if (value) {
      ++product.count;
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.getTotalPrice();
      this.updateBasket();
    } else if (!value && product.count > 1) {
      --product.count;
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.getTotalPrice();
      this.updateBasket();
    }
  };

  productDelete(product: IProductPost): void {
    this.basket.splice(this.basket.indexOf(product), 1);
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.getTotalPrice();
    this.updateBasket();
  };


  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'user-cabinet';
    } else {
      this.isLogin = false;
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  openDialog() {
    this.dialog.open(DialogWindowComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    });
  }

}
