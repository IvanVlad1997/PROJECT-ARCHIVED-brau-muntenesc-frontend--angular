import { NgModule } from '@angular/core';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoListActionsComponent } from './video-list-actions/video-list-actions.component';
import { VideoListEditComponent } from './video-list-edit/video-list-edit.component';
import {AgGridModule} from 'ag-grid-angular';
import {AdminPlatformaCursuriComponent} from './admin-platforma-cursuri/admin-platforma-cursuri.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [AdminPlatformaCursuriComponent, VideoListComponent, VideoListActionsComponent, VideoListEditComponent],
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
    MatIconModule
  ],
  exports: [AdminPlatformaCursuriComponent]
})
export class AdminPlatformaCursuriModule { }
