import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ImageService} from '../../../../platforma-cursuri/src/lib/services/image';
import {Image} from '../../../../common/image';

@Component({
  selector: 'lib-galerie-foto',
  templateUrl: './galerie-foto.component.html',
  styleUrls: ['./galerie-foto.component.scss']
})
export class GalerieFotoComponent implements OnInit, OnDestroy {



  constructor(private authService: AuthService,
              private imageService: ImageService) { }

  images: Image[] = [];
  imageSubscription: Subscription;
  authSubscription: Subscription;
  token: string = '';
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          this.loadImages();
          if (token !== '') {
          }
        });
  }

  loadImages(): void {
    this.imageService.getPhotos();
    this.imageSubscription = this.imageService.getImagesListener()
      .subscribe(
        (images) => {
          this.images = images;
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
    if  (this.imageSubscription)  {
      this.imageSubscription.unsubscribe();
    }
  }

}
