import { NgModule } from '@angular/core';
import {CvComponent} from './cv/cv.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';




@NgModule({
  declarations: [CvComponent],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [CvComponent]
})
export class CvModule { }
