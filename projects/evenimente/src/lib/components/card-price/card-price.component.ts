import {Component, Input, OnInit} from '@angular/core';
import {CardPrice} from "../../common/card-price";

@Component({
  selector: 'lib-card-price',
  templateUrl: './card-price.component.html',
  styleUrls: ['./card-price.component.scss']
})
export class CardPriceComponent implements OnInit {

  constructor() { }

  @Input()
  cardPrice: CardPrice;

  ngOnInit(): void {
  }

}
