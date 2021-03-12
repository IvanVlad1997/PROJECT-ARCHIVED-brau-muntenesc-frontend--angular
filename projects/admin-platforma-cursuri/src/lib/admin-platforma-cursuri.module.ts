import { NgModule } from '@angular/core';
import { VideoListComponent } from './video-lesson/video-list/video-list.component';
import { VideoListActionsComponent } from './video-lesson/video-list-actions/video-list-actions.component';
import { VideoListEditComponent } from './video-lesson/video-list-edit/video-list-edit.component';
import {AgGridModule} from 'ag-grid-angular';
import {AdminPlatformaCursuriComponent} from './admin-platforma-cursuri/admin-platforma-cursuri.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ImageListComponent } from './photo-galery/image-list/image-list.component';
import { ImageEditComponent } from './photo-galery/image-edit/image-edit.component';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VideoGaleryEditComponent } from './video-galery/video-galery-edit/video-galery-edit.component';
import { VideoGaleryListComponent } from './video-galery/video-galery-list/video-galery-list.component';
import { VideoGaleryListActionsComponent } from './video-galery/video-galery-list-actions/video-galery-list-actions.component';
import { PriceListComponent } from './price/price-list/price-list.component';
import { PriceEditComponent } from './price/price-edit/price-edit.component';
import { PriceActionsListComponent } from './price/price-actions-list/price-actions-list.component';
import { ProgramActionsListComponent } from './program/program-actions-list/program-actions-list.component';
import { ProgramListComponent } from './program/program-list/program-list.component';
import { ProgramEditComponent } from './program/program-edit/program-edit.component';
import {MatSelectModule} from '@angular/material/select';
import { CursantiListComponent } from './panou-cursanti/cursanti-list/cursanti-list.component';
import { CursantiListActionsComponent } from './panou-cursanti/cursanti-list-actions/cursanti-list-actions.component';
import { CursantiPayComponent } from './panou-cursanti/cursanti-pay/cursanti-pay.component';
import { CursantiCalendarComponent } from './panou-cursanti/cursanti-calendar/cursanti-calendar.component';
import {UserModule} from '../../../user/src/lib/user.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {QRCodeModule} from 'angularx-qrcode';
import { QrDialogComponent } from './panou-cursanti/qr-dialog/qr-dialog.component';
import { UltimaPlataComponent } from './panou-cursanti/ultima-plata/ultima-plata.component';
import { PanouGrupaComponent } from './panou-cursanti/panou-grupa/panou-grupa.component';
import { DayReportComponent } from './day-report/day-report.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [AdminPlatformaCursuriComponent, VideoListComponent, VideoListActionsComponent, VideoListEditComponent, ImageListComponent, ImageEditComponent, VideoGaleryEditComponent, VideoGaleryListComponent, VideoGaleryListActionsComponent, PriceListComponent, PriceEditComponent, PriceActionsListComponent, ProgramActionsListComponent, ProgramListComponent, ProgramEditComponent, CursantiListComponent, CursantiListActionsComponent, CursantiPayComponent, CursantiCalendarComponent, QrDialogComponent, UltimaPlataComponent, PanouGrupaComponent, DayReportComponent, DashboardComponent],
    imports: [
        AgGridModule,
        RouterModule.forChild(routes),
        MatDialogModule,
        CommonModule,
        MatFormFieldModule,
        FormsModule,
        FlexModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        ExtendedModule,
        MatSelectModule,
        UserModule,
        MatCheckboxModule,
        QRCodeModule,
        MatDatepickerModule,
    ],
  exports: [AdminPlatformaCursuriComponent],
  // providers: [
  //   { provide: MAT_DIALOG_DATA, useValue: {} },
  //   { provide: MatDialogRef, useValue: {} }
  // ]
})
export class AdminPlatformaCursuriModule { }
