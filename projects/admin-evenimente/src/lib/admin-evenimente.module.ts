import { NgModule } from '@angular/core';
import { EventsVideoListComponent } from './video-galery/events-video-list/events-video-list.component';
import { EventsVideoEditComponent } from './video-galery/events-video-edit/events-video-edit.component';
import { EventsVideoListActionsComponent } from './video-galery/events-video-list-actions/events-video-list-actions.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {AdminEvenimenteComponent} from './admin-evenimente/admin-evenimente.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';



@NgModule({
  declarations: [ AdminEvenimenteComponent , EventsVideoListComponent, EventsVideoEditComponent, EventsVideoListActionsComponent],
  imports: [
    RouterModule.forChild(routes),
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FlexModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    AgGridModule
  ],
  exports: []
})
export class AdminEvenimenteModule { }
