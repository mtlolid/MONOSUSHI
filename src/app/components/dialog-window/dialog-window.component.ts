import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/costants/roles.enum';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent {

  constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogWindowComponent>,
    private toastr: ToastrService
  ) { }

  public registerStatus = false;
  public authForm !: FormGroup;
  public regForm !: FormGroup;
  public checkPassword = false;

  ngOnInit(): void {
    this.initAuthForm()
    this.initRegisterForm()
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  initRegisterForm(): void {
    this.regForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      passwordCheck: [null, [Validators.required]]
    })
  }

  changeRegister(): void {
    this.registerStatus = !this.registerStatus;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loginUser(): void {
    const { email, password } = this.authForm.value;

    this.login(email, password).then(() => {
      this.toastr.success('User successfully logined');
      this.closeDialog()
    }).catch(e => {
      this.toastr.error(e);
    })
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);

    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/user-cabinet']);
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const email = this.regForm.value.email;
    const password = this.regForm.value.password;

    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User successfully created');
      this.authForm.reset();
      this.closeDialog()
    }).catch(e => {
      this.toastr.error(e);
    })
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: this.regForm.value.firstName,
      lastName: this.regForm.value.lastName,
      phoneNumber: this.regForm.value.phone,
      address: '',
      orders: [],
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value) {
      this.regForm.controls['passwordCheck'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }

  get password(): AbstractControl {
    return this.regForm.controls['password'];
  }

  get confirmed(): AbstractControl {
    return this.regForm.controls['passwordCheck'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.regForm.controls[control].errors?.[name]
  }

}
