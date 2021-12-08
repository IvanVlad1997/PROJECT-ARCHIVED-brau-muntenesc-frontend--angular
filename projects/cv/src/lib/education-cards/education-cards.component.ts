import {Component, OnInit, ViewChild} from '@angular/core';
import {NguCarousel, NguCarouselConfig} from "@ngu/carousel";
import {CardFlip} from "../../../../cursuri/src/lib/common/card-flip";
import {Program} from "../../../../common/program";

@Component({
  selector: 'lib-education-cards',
  templateUrl: './education-cards.component.html',
  styleUrls: ['./education-cards.component.scss']
})
export class EducationCardsComponent implements OnInit {

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
      title: 'Master',
      description: 'Universitatea de Petrol și Gaze, Facultatea de Litere și Științe, Specializarea Tehnologii avansate de prelucrare a informației',
      image: 'https://i.imgur.com/HTcSVju.jpg',
      titleBack: 'Materii preferate',
      descriptionBack: [
        {
          category: 'Tehnici avansate de învățare automată',
          interval: ''
        },
        {
          category: 'Metaeuristici',
          interval: ''
        },
        {
          category: 'Perioadă',
          interval: '2021-2022'
        }
      ] as Program[],
    },
    {
      title: 'Licență',
      description: `Universitatea de Petrol și Gaze, Facultatea de inginerie mecanică și electrică, Specializarea Automatică`,
      image: 'https://i.imgur.com/rEFTIoN.jpg',
      titleBack: 'Materii preferate',
      descriptionBack: [
        {
          category: 'Programare orientată pe obiecte',
          interval: ''
        },
        {
          category: 'Baze de date',
          interval: ''
        },
        {
          category: 'Matematică',
          interval: ''
        },
        {
          category: 'Perioadă',
          interval: '2016-2020'
        }
      ] as Program[],
    },
    {
      title: 'Liceu',
      description: 'Colegiul Național Alexandru Ioan Cuza, profil teoretic, matematică informatică bilingv engleză',
      image: 'https://i.imgur.com/Q88Y1HI.jpg',
      titleBack: 'Materii preferate',
      descriptionBack: [
        {
          category: 'Matematică',
          interval: ''
        },
        {
          category: 'Fizică',
          interval: ''
        },
        {
          category: 'Sport',
          interval: ''
        },
        {
          category: 'Perioadă',
          interval: '2013 - 2016'
        }
      ] as Program[],
    },
    {
      title: 'Gimnaziu',
      description: 'Colegiul Național Alexandru Ioan Cuza, matematică',
      image: 'https://i.imgur.com/lhF9GdZ.jpg',
      titleBack: 'Materii preferate',
      descriptionBack: [
        {
          category: 'Matematică',
          interval: ''
        },
        {
          category: 'Sport',
          interval: ''
        },
        {
          category: 'Perioadă',
          interval: '2010 - 2013'
        }
      ] as Program[],
    }
  ];


  ngOnInit(): void {
  }
}
