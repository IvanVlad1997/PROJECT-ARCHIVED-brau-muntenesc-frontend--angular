import {Component, Input, OnInit} from '@angular/core';
import {CardFlip} from "../../../../cursuri/src/lib/common/card-flip";

@Component({
  selector: 'lib-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent implements OnInit {
  constructor() { }

  @Input()
  item: CardFlip;

  imageBackground: string;

  ngOnInit(): void {
    this.imageBackground = this.item.image;
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
