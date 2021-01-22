import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CarouselPhoto} from '../../../../../common/carousel-photo';
import {CarouselPhotoService} from '../../../../../broderie/src/lib/services/carousel-photo';
import {CompressImageService} from '../../../../../../src/app/services/compress-image.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-carousel-photo-edit',
  templateUrl: './carousel-photo-edit.component.html',
  styleUrls: ['./carousel-photo-edit.component.scss']
})
export class CarouselPhotoEditComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public carouselPhoto: CarouselPhoto,
              private ref: MatDialogRef<CarouselPhotoEditComponent>,
              private carouselPhotoService: CarouselPhotoService,
              private compressImageService: CompressImageService,
              private authService: AuthService) {

  }

  imageIsUploading: boolean = false
  file: any;
  localUrl: any;
  sizeOFCompressedImage:number;
  compressedImages: any[] = [];
  saveClicked: boolean = false


  authSubscription: Subscription
  token: string = ''


  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            console.log(token)
          }
        });
  }

  ngOnDestroy(): void {
    if (!this.saveClicked) {
        this.compressImageService.removeImage(this.carouselPhoto.imageId, this.token)
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }

  async onImagePicked(event: Event): Promise<void> {
    this.imageIsUploading = true
    const files: any = (event.target as HTMLInputElement).files;
    for (let file of files){
      this.imageIsUploading = true
      const fileName = file.name;
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        this.localUrl = e.target.result;
        const imageCompressed = await this.compressImageService.compressFile(this.localUrl, fileName, 100, this.token)
        console.log(imageCompressed)
        this.carouselPhoto.imageUrl = imageCompressed.url;
        this.carouselPhoto.imageId = imageCompressed.public_id;
        this.imageIsUploading = false
      }
      reader.readAsDataURL(file);
    }
  }

  async addPhoto(): Promise<void> {
    console.log(this.carouselPhoto)
    this.imageIsUploading = true
    this.saveClicked = true;
    await this.carouselPhotoService.createCarouselPhoto(this.carouselPhoto);
    this.imageIsUploading = false;
    this.ref.close();
  }
}