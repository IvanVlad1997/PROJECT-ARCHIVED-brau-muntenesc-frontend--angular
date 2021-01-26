import { NgModule } from '@angular/core';
import {CvComponent} from './cv/cv.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {FlexModule} from '@angular/flex-layout';




@NgModule({
  declarations: [CvComponent],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
  ],
  exports: [CvComponent]
})
export class CvModule { }
