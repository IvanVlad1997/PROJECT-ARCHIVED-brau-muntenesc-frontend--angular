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
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {PlyrModule} from 'ngx-plyr';
import {OverlayModule} from '@angular/cdk/overlay';
import { OverlayComponent } from './platforma-cursuri/overlay/overlay.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [PlatformaCursuriComponent, PaginaPrincipalaComponent, VideoListActionsComponent, VideoItemComponent, OverlayComponent],
    imports: [
        RouterModule.forChild(routes),
        AgGridModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        FlexModule,
        PlyrModule,
        OverlayModule,
        ExtendedModule,
        MatProgressSpinnerModule,
        MatListModule,
    ],
  exports: []
})
export class PlatformaCursuriModule { }
