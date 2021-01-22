import { NgModule } from '@angular/core';
import { PaginaPrincipalaComponent } from './pagina-principala/pagina-principala.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {EvenimenteComponent} from './evenimente/evenimente.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {PlyrModule} from 'ngx-plyr';
import {MatButtonModule} from '@angular/material/button';
import { GalerieVideoComponent } from './galerie-video/galerie-video.component';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [EvenimenteComponent, PaginaPrincipalaComponent, GalerieVideoComponent],
  imports: [
    RouterModule.forChild(routes),
    MatListModule,
    MatIconModule,
    FlexModule,
    PlyrModule,
    MatButtonModule,
    ExtendedModule,
    CommonModule,
  ],
  exports: [EvenimenteComponent]
})
export class EvenimenteModule { }
