import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Category} from '../../../../../common/category';
import {SubCategory} from '../../../../../common/sub-category';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../../../../common/product';
import {ProductService} from '../../../../../broderie/src/lib/services/product';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {CompressImageService} from '../../../../../../src/app/services/compress-image.service';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  categorySubscription: Subscription;
  categories: Category[];
  subcategorySubscription: Subscription;
  subCategories: SubCategory[] = []

  imageIsUploading: boolean = false
  file: any;
  localUrl: any;
  sizeOFCompressedImage: number;
  compressedImages: any[] = [];
  saveClicked: boolean = false

  constructor(@Inject(MAT_DIALOG_DATA) public product: Product,
              private ref: MatDialogRef<ProductEditComponent>,
              private productService: ProductService,
              private categoryService: CategoryService,
              private compressImageService: CompressImageService,
              private authService: AuthService) { }

  authSubscription: Subscription
  token: string = ''


  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            this.loadCategories()
          }
        });
  }

  loadCategories(): void {
    this.categoryService.getCategories();
    this.categorySubscription = this.categoryService.getCategoriesListener()
      .subscribe(categories => {
        this.categories = categories;
      });
    if (this.product && this.product.category && this.product.category._id) {
      this.fetchSubCategories().then((sub: SubCategory[]) => this.subCategories = sub);
    }
  }

  async edit(): Promise<void> {
    this.imageIsUploading = true
    this.saveClicked = true;
    this.product.images = [...this.product.images, ...this.compressedImages];
    if (this.product.slug) {
        await this.productService.updateProduct(this.product.slug, this.product);
        this.imageIsUploading = false
        this.ref.close();
      } else {
        await this.productService.createProduct(this.product);
        this.imageIsUploading = false
        this.ref.close();
    }
  }

  async changeSubCategories(): Promise<void> {
    this.product.subCategory = [];
    this.subCategories = await this.fetchSubCategories();
  }

  async fetchSubCategories(): Promise<SubCategory[]> {
    const subCategories: SubCategory[]  = await this.categoryService.getSubCategories(this.product.category._id)
      .toPromise();
    return subCategories;
  }


  changeSubCategory(subCategory: SubCategory[]): void {
    this.product.subCategory = [...subCategory];
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
    if (this.subcategorySubscription) {
      this.subcategorySubscription.unsubscribe();
    }
    if (!this.saveClicked) {
      for (let image of this.compressedImages) {
        this.compressImageService.removeImage(image.public_id, this.token)
      }
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
          this.compressedImages.push(imageCompressed)
          console.log(this.compressedImages)
          this.imageIsUploading = false
        }
      reader.readAsDataURL(file);
    }
  }


  handleImageRemove(id: any, index: number, compressed: boolean): void {
    this.imageIsUploading = true
    console.log('remove img', id)
    this.compressImageService.removeImage(id, this.token)
    console.log(this.compressedImages)
    console.log(index)
    if (compressed) {
      this.compressedImages.splice(index, 1);
      console.log(this.compressedImages)
    } else {
      this.product.images.splice(index, 1);
    }
    this.imageIsUploading = false;
  }

}
