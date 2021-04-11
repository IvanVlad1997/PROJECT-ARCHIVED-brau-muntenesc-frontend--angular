import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CompressImageService} from '../../../../../../src/app/services/compress-image.service';
import {Image} from '../../../../../common/image';
import {ImageService} from '../../../../../platforma-cursuri/src/lib/services/image';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public image: Image,
              private ref: MatDialogRef<ImageEditComponent>,
              private imageService: ImageService,
              private compressImageService: CompressImageService) {

  }

  imageIsUploading: boolean = false;
  file: any;
  localUrl: any;
  sizeOFCompressedImage: number;
  compressedImages: any[] = [];
  saveClicked: boolean = false;
  authSubscription: Subscription;
  token: string = '';


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (!this.saveClicked) {
      this.compressImageService.removeImage(this.image.imageId);
    }
  }

  async onImagePicked(event: Event): Promise<void> {
    this.imageIsUploading = true;
    const files: any = (event.target as HTMLInputElement).files;
    for (let file of files){
      this.imageIsUploading = true;
      const fileName = file.name;
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        this.localUrl = e.target.result;
        const imageCompressed = await this.compressImageService.compressFile(this.localUrl, fileName, 100);
        this.image.imageUrl = imageCompressed.url;
        this.image.imageId = imageCompressed.public_id;
        this.imageIsUploading = false;
      };
      reader.readAsDataURL(file);
    }
  }

  async addPhoto(): Promise<void> {
    this.imageIsUploading = true;
    this.saveClicked = true;
    await this.imageService.createPhoto(this.image);
    this.imageIsUploading = false;
    this.ref.close();
  }
}
