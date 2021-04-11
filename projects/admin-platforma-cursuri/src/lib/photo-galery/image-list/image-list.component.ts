import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CompressImageService} from '../../../../../../src/app/services/compress-image.service';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';
import {ImageService} from '../../../../../platforma-cursuri/src/lib/services/image';
import {Image} from '../../../../../common/image';
import {ImageEditComponent} from '../image-edit/image-edit.component';

@Component({
  selector: 'lib-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent  implements OnInit, OnDestroy {

  constructor(private imageService: ImageService,
              private matDialog: MatDialog,
              private compressImageService: CompressImageService,
             ) { }

  images: Image[] = [];
  photoSubscription: Subscription;
  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.imageService.getPhotos();
    this.photoSubscription = this.imageService.getImagesListener()
      .subscribe(images => {
        this.images = images;
      });
  }

  ngOnDestroy(): void {
    if  (this.photoSubscription)  {
      this.photoSubscription.unsubscribe();
    }
  }

  async addPhoto(): Promise<void> {
    const newPhoto: Image = {
      _id: undefined,
      type: 'galerie-cursuri',
      imageId: '',
      imageUrl: '',
      name: '',
      slug: '',
      createdAt: undefined,
      updatedAt: undefined,
      _v: null
    };
    this.matDialog.open(ImageEditComponent,
      {
        data: newPhoto,
        disableClose: true
      });
  }

  async handleImageRemove(photo: Image): Promise<void> {
    if (window.confirm('Esti sigur, ba?')) {
      await this.compressImageService.removeImage(photo.imageId);
      this.imageService.removePhoto(photo.slug);
    }
  }
}
