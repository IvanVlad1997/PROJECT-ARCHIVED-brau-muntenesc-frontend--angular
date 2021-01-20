import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { UserHistoryComponent } from './user-history/user-history.component';
import {routes} from './routes';
import { UserComponent } from './user/user.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { PasswordComponent } from './password/password.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { UserHistoryProductsTableComponent } from './user-history-products-table/user-history-products-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangeUserPropDialogComponent } from './dashboard/change-user-prop-dialog/change-user-prop-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {QuillModule} from 'ngx-quill';
import {QRCodeModule} from 'angularx-qrcode';

@NgModule({
  declarations: [UserHistoryComponent, UserComponent, PasswordComponent, WishlistComponent, UserHistoryProductsTableComponent, DashboardComponent, ChangeUserPropDialogComponent],
    imports: [
        RouterModule.forChild(routes),
        MatListModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        FlexModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        MatDialogModule,
        ExtendedModule,
        MatCardModule,
        QuillModule.forRoot(),
        QRCodeModule
    ],
  exports: []
})
export class UserModule { }
