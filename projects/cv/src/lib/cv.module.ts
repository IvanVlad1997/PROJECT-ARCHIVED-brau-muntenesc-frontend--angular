import { NgModule } from '@angular/core';
import {CvComponent} from './cv/cv.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ProiecteProgramareComponent } from './proiecte-programare/proiecte-programare.component';
import { VideoSchiComponent } from './video-schi/video-schi.component';
import {PlyrModule} from 'ngx-plyr';
import { CursuriUdemyComponent } from './imagine/cursuri-udemy.component';
import { FrozenLogicComponent } from './frozen-logic/frozen-logic.component';
import {ComponentsModule} from '../../../components/src/lib/components.module';
import { EducationCardsComponent } from './education-cards/education-cards.component';
import {NguCarouselModule} from "@ngu/carousel";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [CvComponent, ProiecteProgramareComponent, VideoSchiComponent, CursuriUdemyComponent, FrozenLogicComponent, EducationCardsComponent],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
    MatButtonModule,
    MatDialogModule,
    PlyrModule,
    ComponentsModule,
    NguCarouselModule,
    ExtendedModule,
    CommonModule
  ],
  exports: [CvComponent]
})
export class CvModule { }
