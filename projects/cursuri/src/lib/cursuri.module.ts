import {NgModule} from '@angular/core';
import {CursuriComponent} from './cursuri/cursuri.component';
import {PrimaPaginaComponent} from './prima-pagina/prima-pagina.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {PlyrModule} from 'ngx-plyr';
import {MatCardModule} from '@angular/material/card';
import {BroderieModule} from '../../../broderie/src/lib/broderie.module';
import {CarouselPhotoGalerieComponent} from './carousel-photo-galerie/carousel-photo-galerie.component';
import {NguCarouselModule} from '@ngu/carousel';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {GalerieFotoComponent} from './galerie-foto/galerie-foto.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {GalerieVideoComponent} from './galerie-video/galerie-video.component';
import {InformatiiComponent} from './informatii/informatii.component';
import {ParteneriMediaComponent} from './parteneri-media/parteneri-media.component';
import {CarouselGalerieComponent} from './carousel/carousel-galerie.component';
import {HeaderCoursesVideoComponent} from './components/header-courses-video/header-courses-video.component';
import {InfoCardsFlipComponent} from './components/info-cards-flip/info-cards-flip.component';
import {InfoCardFlipComponent} from './components/info-card-flip/info-card-flip.component';
import {CtaBigComponent} from './components/cta-big/cta-big.component';
import {AccordionSwiperComponent} from './components/accordion-swiper/accordion-swiper.component';
import {CdkAccordionModule} from "@angular/cdk/accordion";
import { GalleryPicturesComponent } from './components/gallery-pictures/gallery-pictures.component';
import { GalleryTextComponent } from './components/gallery-text/gallery-text.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FormSectionComponent } from './components/form-section/form-section.component';
import {ContactModule} from "../../../contact/src/lib/contact.module";
import { MeetInstructorsComponent } from './components/meet-instructors/meet-instructors.component';

@NgModule({
  declarations: [CarouselGalerieComponent,
    CursuriComponent,
    PrimaPaginaComponent,
    CarouselPhotoGalerieComponent, GalerieFotoComponent, GalerieVideoComponent, InformatiiComponent, ParteneriMediaComponent, HeaderCoursesVideoComponent,
    InfoCardsFlipComponent,
    InfoCardFlipComponent,
    CtaBigComponent,
    AccordionSwiperComponent,
    GalleryPicturesComponent,
    GalleryTextComponent,
    GalleryComponent,
    FormSectionComponent,
    MeetInstructorsComponent],
  imports: [
    RouterModule.forChild(routes),
    FlexModule,
    CommonModule,
    PlyrModule,
    MatCardModule,
    NguCarouselModule,
    ExtendedModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    CdkAccordionModule,
    ContactModule

  ],
  exports: []
})
export class CursuriModule {
}
