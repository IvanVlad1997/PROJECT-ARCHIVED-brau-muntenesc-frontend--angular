import {Component, Input, OnInit} from '@angular/core';
import {CarouselPhotoService} from "../../services/carousel-photo";
import {Subscription} from "rxjs";
import {Product} from "../../../../../common/product";

@Component({
  selector: 'lib-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.scss']
})
export class LatestProductsComponent implements OnInit {

  constructor() {

  }

  @Input()
  latestProducts: Product[];

  @Input()
  loadingNew: boolean;



  ngOnInit() {

  }

}

