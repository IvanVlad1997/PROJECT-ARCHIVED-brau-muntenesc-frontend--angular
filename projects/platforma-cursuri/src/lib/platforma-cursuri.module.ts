import { NgModule } from '@angular/core';
import { PaginaPrincipalaComponent } from './pagina-principala/pagina-principala.component';
import {PlatformaCursuriComponent} from './platforma-cursuri/platforma-cursuri.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {AgGridModule} from 'ag-grid-angular';
import { VideoListActionsComponent } from './video-list-actions/video-list-actions.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { VideoItemComponent } from './video-item/video-item.component';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {PlyrModule} from 'ngx-plyr';



@NgModule({
  declarations: [PlatformaCursuriComponent, PaginaPrincipalaComponent, VideoListActionsComponent, VideoItemComponent],
  imports: [
    RouterModule.forChild(routes),
    AgGridModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FlexModule,
    PlyrModule,
  ],
  exports: []
})
export class PlatformaCursuriModule { }
