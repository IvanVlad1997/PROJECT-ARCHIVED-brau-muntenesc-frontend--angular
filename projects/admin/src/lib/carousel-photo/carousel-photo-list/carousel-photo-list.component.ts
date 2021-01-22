import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarouselPhotoService} from '../../../../../broderie/src/lib/services/carousel-photo';
import {CarouselPhoto} from '../../../../../common/carousel-photo';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CarouselPhotoEditComponent} from '../carousel-photo-edit/carousel-photo-edit.component';
import {CompressImageService} from '../../../../../../src/app/services/compress-image.service';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-carousel-photo-list',
  templateUrl: './carousel-photo-list.component.html',
  styleUrls: ['./carousel-photo-list.component.scss']
})
export class CarouselPhotoListComponent implements OnInit, OnDestroy {

  constructor(private carouselPhotoService: CarouselPhotoService,
              private matDialog: MatDialog,
              private compressImageService: CompressImageService,
              private authService: AuthService) { }

  carouselPhotos: CarouselPhoto[] = [];
  carouselPhotoSubscription: Subscription;
  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            console.log(token)
            this.loadCarouselPhotop(token)
          }
        });
  }

  loadCarouselPhotop(token): void {
    this.carouselPhotoService.getCarouselPhotos()
    this.carouselPhotoSubscription = this.carouselPhotoService.getCarouselPhotoListener()
      .subscribe(carouselPhotos => {
        this.carouselPhotos = carouselPhotos;
      });
  }

  ngOnDestroy(): void {
    this.carouselPhotoSubscription.unsubscribe();
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }

  async addPhoto(): Promise<void> {
    console.log('adding photo')
    const newPhoto: CarouselPhoto = {
      _id: undefined,
      imageId: '',
      imageUrl: '',
      name: '',
      slug: '',
      createdAt: undefined,
      updatedAt: undefined,
      _v: null
    }
    this.matDialog.open(CarouselPhotoEditComponent,
      {
        data: newPhoto,
        disableClose: true
      })
  }

  async handleImageRemove(photo: CarouselPhoto): Promise<void> {
    if (window.confirm('Esti sigur, ba?')) {
      await this.compressImageService.removeImage(photo.imageId, this.token);
      this.carouselPhotoService.removeCarouselPhoto(photo.slug);
    }
  }
}
