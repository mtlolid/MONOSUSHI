import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { ActionsComponent } from './pages/actions/actions.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ActionComponent } from './pages/admin/action/action.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { MainComponent } from './pages/main/main.component';
import { RollsComponent } from './pages/product-category/rolls/rolls.component';
import { SetsComponent } from './pages/product-category/sets/sets.component';
import { DrinksComponent } from './pages/product-category/drinks/drinks.component';
import { SaucesComponent } from './pages/product-category/sauces/sauces.component';
import { ProductComponent } from './pages/admin/product/product.component';
import { ActionsInfoComponent } from './pages/actions-info/actions-info.component';
import { ProductCategoryInfoComponent } from './pages/product-category-info/product-category-info.component';
import { UserCabinetComponent } from './pages/user-cabinet/user-cabinet.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ActionsComponent,
    ProductCategoryComponent,
    DostavkaTaOplataComponent,
    AboutUsComponent,
    AdminComponent,
    ActionComponent,
    MainComponent,
    CategoryComponent,
    RollsComponent,
    SetsComponent,
    DrinksComponent,
    SaucesComponent,
    ProductComponent,
    ActionsInfoComponent,
    ProductCategoryInfoComponent,
    UserCabinetComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
