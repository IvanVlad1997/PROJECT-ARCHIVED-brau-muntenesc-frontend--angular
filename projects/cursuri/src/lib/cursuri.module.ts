import { NgModule } from '@angular/core';
import { CursuriComponent } from './cursuri/cursuri.component';
import { PrimaPaginaComponent } from './prima-pagina/prima-pagina.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {FlexModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [CursuriComponent, PrimaPaginaComponent],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
    CommonModule,
  ],
  exports: []
})
export class CursuriModule { }
