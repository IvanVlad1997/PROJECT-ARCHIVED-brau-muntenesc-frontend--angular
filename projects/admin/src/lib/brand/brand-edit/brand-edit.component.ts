import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Brand} from '../../../../../common/brand';
import {BrandService} from '../../services/brand';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss']
})
export class BrandEditComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public brand: Brand,
               private ref: MatDialogRef<BrandEditComponent>,
               private brandService: BrandService,
             ) {}

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
  }


  async edit(): Promise<void> {
    if (this.brand.slug) {
      await this.brandService.programUpdate(this.brand.slug, this.brand);
    } else {
      await this.brandService.brandCreate(this.brand);
    }
    this.ref.close();
  }

  ngOnDestroy(): void {
  }
}
