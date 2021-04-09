import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {User} from '../../../../common/user';
import {MatDialog} from '@angular/material/dialog';
import {ChangeUserPropDialogComponent} from './change-user-prop-dialog/change-user-prop-dialog.component';
import {ContentChange} from 'ngx-quill';
import {UserService} from '../services/user';
import {ToastService} from 'angular-toastify';

@Component({
  selector: 'lib-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private dialog: MatDialog,
              private userService: UserService,
              private toastService: ToastService) { }

  authSubscription: Subscription;
  userSubscription: Subscription;
  token = '';
  user: User;
  changeAddressOn: boolean = false;
  address: string = '';
  addressContent: string = '';
  savedAddress = '\n';

  @ViewChild('editor') editor;

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [ 'code-block']
    ]
  };


  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            this.loadUser();
          }
        });
  }

  loadUser(): void {
    this.userSubscription = this.authService.user
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      );
  }

  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
    if  (this.userSubscription)  {
      this.userSubscription.unsubscribe();
    }
  }

  changeName(): void {
    this.dialog.open(ChangeUserPropDialogComponent,
      {
        data: {name: this.user.name,
              isName: true}
      });
  }

  changeTelNum(): void {
    this.dialog.open(ChangeUserPropDialogComponent,
      {
        data: {
          telNum: this.user.telNum,
          isTelNum: true
        }
      });
  }

  // changeEmail(): void {
  //   this.dialog.open(ChangeUserPropDialogComponent,
  //     {
  //       data: {
  //         email: this.user.email,
  //         isEmail: true
  //       }
  //     })
  // }

  toggleChangeAddress(): void {
    this.changeAddressOn = !this.changeAddressOn;
  }

  contentChanged(contentChange: ContentChange): void {
    this.address = contentChange.html;
    this.addressContent = contentChange.text;
  }


  saveAddressToDb(): void {
    const newAddressArray: string[] = [this.address, this.addressContent];
    this.userSubscription = this.userService.saveUserAddress(newAddressArray)
      .subscribe((c) => {
          this.user.address = newAddressArray;
          this.toastService.success('Adresa a fost salvată cu succes! Puteți finaliza comanda');
        },
        error => {
          this.toastService.error('Adresa nu a putut fi salvată. Vă rugăm să reîncercați!');
        });
  }
}
