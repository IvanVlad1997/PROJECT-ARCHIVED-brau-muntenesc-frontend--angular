import {ChangeDetectorRef, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NguCarousel, NguCarouselConfig} from "@ngu/carousel";
import {CardFlip} from "../../common/card-flip";
import {Program} from "../../../../../common/program";

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

  carouselItems: CardFlip[] = [
    {
      title: 'Grupe de nou veniți',
      description: 'Predăm mișcările de bază și dansuri ușoare. În fiecare lună începem de la 0.',
      image: 'https://i.imgur.com/zQdNPhR.jpg',
      titleBack: 'Program',
      descriptionBack: [
        {
          category: 'Grupă miercuri',
          interval: '18:00 - 19:15 (inactivă)'
        }
      ] as Program[],
    },
    {
      title: 'Grupe de începători',
      description: 'Îi așteptăm pe cei care vor să învețe dansuri simple, de petrecere.',
      image: 'https://i.imgur.com/i5GxjIY.jpg',
      titleBack: 'Program',
      descriptionBack: [
        {
          category: 'Grupă luni',
          interval: '18:00 - 19:15'
        },
        {
          category: 'Grupă joi',
          interval: '18:00 - 19:15'
        },
        {
          category: 'Grupă marți',
          interval: '19:30 - 20:45'
        }
      ] as Program[],
    },
    {
      title: 'Grupe de intermediari',
      description: 'Dansurile învățate la începători sunt grupate în colaje. Energia și distracția sunt nelipsite.',
      image: 'https://i.imgur.com/cc6Ysyh.jpg',
      titleBack: 'Program',
      descriptionBack: [
        {
          category: 'Grupă marți',
          interval: '18:00 - 19:15'
        },
        {
          category: 'Grupă luni',
          interval: '19:30 - 20:45'
        }
      ] as Program[],
    },
    {
      title: 'Grupă de avansați',
      titleBack: 'Program',
      description: 'Se lucrează la stucturi complexe de pași.',
      image: 'https://i.imgur.com/B1HA1qs.jpg',
      descriptionBack: [
        {
          category: 'Grupă miercuri',
          interval: '19:30 - 20:45'
        },
      ] as Program[],
    }
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
