import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-info-card-flip',
  templateUrl: './info-card-flip.component.html',
  styleUrls: ['./info-card-flip.component.scss']
})
export class InfoCardFlipComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  removeFlippedClass(frontSide: HTMLDivElement, backSide: HTMLDivElement): void {
    frontSide.classList.remove('flipped');
    backSide.classList.remove('flipped');
  }

  addFlippedClass(frontSide: HTMLDivElement, backSide: HTMLDivElement): void {
    frontSide.classList.add('flipped');
    backSide.classList.add('flipped');
  }
}
