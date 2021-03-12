import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NguCarousel, NguCarouselConfig} from '@ngu/carousel';

@Component({
  selector: 'lib-carousel-photo-galerie',
  templateUrl: './carousel-photo-galerie.component.html',
  styleUrls: ['./carousel-photo-galerie.component.scss']
})
export class CarouselPhotoGalerieComponent implements AfterViewInit, OnInit, OnChanges {
  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;

  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };

  @Input() images: any[] = [];
  carouselItems: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadCarouselImages();
  }

  ngOnInit(): void {
    this.loadCarouselImages();
  }

  loadCarouselImages(): void {
    this.carouselItems = this.images.map((image) => image.url);
  }


  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
