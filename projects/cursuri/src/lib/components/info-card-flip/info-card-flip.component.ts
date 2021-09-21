import {Component, Input, OnInit} from '@angular/core';
import {CardFlip} from "../../common/card-flip";

@Component({
  selector: 'lib-info-card-flip',
  templateUrl: './info-card-flip.component.html',
  styleUrls: ['./info-card-flip.component.scss']
})
export class InfoCardFlipComponent implements OnInit {

  constructor() { }

  @Input()
  item: CardFlip;

  imageBackground: string;

  ngOnInit(): void {
    // this.imageBackground = `linear-gradient(36.4deg, rgba(0, 220, 255, .4) 22.12%, rgba(0, 255, 170, .4) 110.96%),
    //   url({{item.image}}) center;}`;
    this.imageBackground = this.item.image;
    console.log(this.imageBackground);
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
