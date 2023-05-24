import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent {

  public curentUserEmail!: string;

  constructor(
    private router: Router,
    private accountService: AccountService
  ){}

  ngOnInit(): void {
    this.getCurentUser();
    
  }

  logout(): void{
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }

  getCurentUser() : void{
    const curentUser = JSON.parse(localStorage.getItem('currentUser') as string); 
  }

}
