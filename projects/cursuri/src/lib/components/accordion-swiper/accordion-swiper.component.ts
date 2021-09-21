import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CdkAccordionItem} from '@angular/cdk/accordion';
import {PlyrComponent} from 'ngx-plyr';
import {NguCarousel, NguCarouselConfig} from "@ngu/carousel";

@Component({
  selector: 'lib-accordion-swiper',
  templateUrl: './accordion-swiper.component.html',
  styleUrls: ['./accordion-swiper.component.scss']
})
export class AccordionSwiperComponent implements AfterViewInit {

  constructor() { }

  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: {xs: 2.1, sm: 2.7, md: 1, lg: 1, all: 0},
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


  items: {
    title: string,
    description: string,
    src: string
  }[] = [
    {
      title: 'Sârba Ofițerească',
      description: 'Dans vioi, care se joacă de obicei în cerc, cu mâinile așezate pe umerii partenerilor',
      src: '8snx63yPpBs'
    },
    {
      title: 'Ciobănașul',
      description: 'Dans de perechi, mișcare vioaie, pași simpli',
      src: 'Jd7aD5a3nwY'
    },
    {
      title: 'Hora',
      description: 'Dansatorii se ţin de mână, făcând paşi în diagonală fie în faţă, fie în spate, totodată învârtind cercul',
      src: 'PdRi61iNkng'
    },
    {
      title: 'Brașoveanca',
      description: 'Dans de cuplu. Trei pași înainte și trei înapoi',
      src: 'H1Sj_4vwJZ4'
    },

  ];

  expandedIndex = 0;
  @ViewChild('accordionItem') accordionItem: CdkAccordionItem;

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;



  videoSources: Plyr.Source[] = [
    {
      src: '8snx63yPpBs',
      provider: 'youtube',
    },
    // {
    //   src: 'Jd7aD5a3nwY',
    //   provider: 'youtube',
    // },
  ];


  options = {
    quality: 720
  };




  toggleAccordion(accordionItem: CdkAccordionItem, src: string): void {
    if (accordionItem) {
      accordionItem.toggle();
    }


    this.plyr.player.source = {
      type: 'video',
      title: 'Dance',
      sources: [
        {
          src:  src,
         provider: 'youtube'
        }
      ],
    };

    this.plyr.player.play();

  }

  ngAfterViewInit(): void {
    if (this.accordionItem) {
      this.accordionItem.toggle();
    }

  }



}
