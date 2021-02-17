import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../../../../common/category';
import {CategoryService} from '../../../../../broderie/src/lib/services/category';
import {Brand} from '../../../../../common/brand';
import {BrandService} from '../../services/brand';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss']
})
export class BrandEditComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public brand: Brand,
               private ref: MatDialogRef<BrandEditComponent>,
               private brandService: BrandService,
               private authService: AuthService) {}

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
        });
  }


  async edit(): Promise<void> {
    if (this.brand.slug) {
      await this.brandService.programUpdate(this.brand.slug, this.brand, this.token)
    } else {
      await this.brandService.brandCreate(this.brand, this.token);
    }
    this.ref.close();
  }

  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }
}
