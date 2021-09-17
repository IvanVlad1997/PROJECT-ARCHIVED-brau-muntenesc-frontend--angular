import {ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NguCarousel, NguCarouselConfig} from "@ngu/carousel";

@Component({
  selector: 'lib-info-cards-flip',
  templateUrl: './info-cards-flip.component.html',
  styleUrls: ['./info-cards-flip.component.scss']
})
export class InfoCardsFlipComponent implements OnInit {
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: {xs: 1.4, sm: 2.4, md: 1, lg: 1, all: 0},
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    slide: 1,
    loop: true,
    touch: true,
    velocity: 0.2,
    easing: 'ease',

    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };

  carouselItems: any[] = [
   'text1',
    'text2',
    'text3',
    'text4',
    'text5'
  ];

  // @Input() images: any[] = [];
  // carouselItems: any[] = [];

  // constructor(private cdr: ChangeDetectorRef) {
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.loadCarouselImages();
  // }

  ngOnInit(): void {
    // this.loadCarouselImages();
  }

  // loadCarouselImages(): void {
  //   this.carouselItems = this.images.map((image) => image.imageUrl);
  // }
  //
  //
  //
  // ngAfterViewInit(): void {
  //   this.cdr.detectChanges();
  // }




}
