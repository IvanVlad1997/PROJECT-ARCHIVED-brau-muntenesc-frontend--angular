import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../../common/user';
import {UsersService} from '../../services/users';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public user: User,
               private ref: MatDialogRef<UserEditComponent>,
               private usersService: UsersService,
               ) {}

  authSubscription: Subscription;
  token: string = '';


  ngOnInit(): void {
  }

  async edit(): Promise<void> {
    await this.usersService.updateUser(this.user);
    this.ref.close();
  }

  ngOnDestroy(): void {
  }

  changeDanceStatus(): void {
    this.user.dance = !this.user.dance;
  }
}
