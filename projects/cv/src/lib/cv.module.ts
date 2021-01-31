import { NgModule } from '@angular/core';
import {CvComponent} from './cv/cv.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ProiecteProgramareComponent } from './proiecte-programare/proiecte-programare.component';
import { VideoSchiComponent } from './video-schi/video-schi.component';
import {PlyrModule} from 'ngx-plyr';
import { CursuriUdemyComponent } from './imagine/cursuri-udemy.component';



@NgModule({
  declarations: [CvComponent, ProiecteProgramareComponent, VideoSchiComponent, CursuriUdemyComponent],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
    MatButtonModule,
    MatDialogModule,
    PlyrModule
  ],
  exports: [CvComponent]
})
export class CvModule { }
