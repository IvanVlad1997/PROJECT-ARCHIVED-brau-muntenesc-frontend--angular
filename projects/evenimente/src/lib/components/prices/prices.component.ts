import { Component, OnInit } from '@angular/core';
import {CardPrice} from "../../common/card-price";

@Component({
  selector: 'lib-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  constructor() { }

  cardsPrice: CardPrice[] = [
    {
      buttonText: "Sună acum",
      list: [
        '2 perechi',
        '1 suită',
        'Horă cu invitații',
        'Ploiești',
      ],
      price: "600 lei",
      titleIcon: "star-three-points-outline",
      titleText: "Pachet simplu"
    },
    {
      buttonText: "Sună acum",
      list: [
        '2 perechi',
        '2 suite',
        'Colaj cu invitații',
        'Ploiești',
      ],
      price: "800 lei",
      titleIcon: "star-three-points-outline",
      titleText: "Pachet normal"
    },
    {
      buttonText: "Sună acum",
      list: [
        '3 perechi',
        '2 suite',
        'Colaj cu invitații',
        'Ploiești',
      ],
      price: "1200 lei",
      titleIcon: "star-three-points-outline",
      titleText: "Pachet complet"
    }
  ];

  ngOnInit(): void {
  }

}
