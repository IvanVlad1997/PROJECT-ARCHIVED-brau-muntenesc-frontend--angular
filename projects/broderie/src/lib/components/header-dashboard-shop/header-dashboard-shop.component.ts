import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarouselPhotoService} from "../../services/carousel-photo";
import {Subscription} from "rxjs";

@Component({
  selector: 'lib-header-dashboard-shop',
  templateUrl: './header-dashboard-shop.component.html',
  styleUrls: ['./header-dashboard-shop.component.scss']
})
export class HeaderDashboardShopComponent implements OnInit, OnDestroy {
  constructor(private carouselPhotoService: CarouselPhotoService){
  }

  carouselPhotoSubscription: Subscription;
  carouselPhotos: { url: string }[] = [];

  ngOnInit(): void {
    this.loadCarouselPhotos();

  }

  ngOnDestroy(): void {
    if (this.carouselPhotoSubscription) {
      this.carouselPhotoSubscription.unsubscribe();
    }
  }

  loadCarouselPhotos(): void {
    this.carouselPhotoService.getCarouselPhotos();
    this.carouselPhotoSubscription = this.carouselPhotoService.getCarouselPhotoListener()
      .subscribe(carouselPhotos => {
        this.carouselPhotos = carouselPhotos.map((photo) => ({
          url: photo.imageUrl
        }));
      });
  }
}
