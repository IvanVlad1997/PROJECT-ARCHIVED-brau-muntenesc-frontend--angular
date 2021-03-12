import { Component, OnInit } from '@angular/core';
import {CategoryEditComponent} from '../../../../../admin/src/lib/category/category-edit/category-edit.component';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {UsersService} from '../../services/users';
import {ToastService} from 'angular-toastify';
import {User} from '../../../../../common/user';
import {UserEditComponent} from '../user-edit/user-edit.component';

@Component({
  selector: 'lib-user-list-actions',
  templateUrl: './user-list-actions.component.html',
  styleUrls: ['./user-list-actions.component.scss']
})
export class UserListActionsComponent implements AgFrameworkComponent<BaseColDefParams> {

  constructor(private dialog: MatDialog,
              private usersService: UsersService,
              private toastService: ToastService) { }

  user: User;

  agInit(params: BaseColDefParams): void {
    this.user = params.data;
    console.log(this.user);
  }

  edit(): void {
    this.dialog.open(UserEditComponent,
      {
        data: this.user,
        disableClose: true
      });
  }

  // async delete(): Promise<void> {
  //   if (window.confirm(`Esti sigur că vrei să stergi categoria ${this.category.name}?`))
  //   {
  //     try {
  //       this.categoryService.removeCategory(this.category.slug);
  //
  //     } catch (error) {
  //       this.toastService.error('Nu s-a putut șterge categoria!');
  //     }
  //   } else {
  //
  //   }
  // }
}
