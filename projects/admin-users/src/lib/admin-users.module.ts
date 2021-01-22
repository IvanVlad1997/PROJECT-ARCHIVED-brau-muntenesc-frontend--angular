import { NgModule } from '@angular/core';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListActionsComponent } from './users/user-list-actions/user-list-actions.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {MatDialogModule} from '@angular/material/dialog';
import {AgGridModule} from 'ag-grid-angular';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { AppInfoComponent } from './qr-scan/app-info/app-info.component';
import { AppInfoDialogComponent } from './qr-scan/app-info-dialog/app-info-dialog.component';
import { FormatsDialogComponent } from './qr-scan/formats-dialog/formats-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [UserListComponent, UserEditComponent, UserListActionsComponent, AdminUsersComponent, QrScanComponent, AppInfoComponent, AppInfoDialogComponent, FormatsDialogComponent],
    imports: [
        RouterModule.forChild(routes),
        MatDialogModule,
        AgGridModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        FlexModule,
        CommonModule,
        ZXingScannerModule,
        MatMenuModule,
        MatListModule,
        MatCheckboxModule,
    ],
  exports: [],
  entryComponents: [FormatsDialogComponent, AppInfoDialogComponent]
})
export class AdminUsersModule { }
