import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from 'angular-toastify';
import {Cupon} from '../../../../../common/cupon';
import {CuponService} from '../../../../../broderie/src/lib/services/cupon';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'lib-cupon-edit',
  templateUrl: './cupon-edit.component.html',
  styleUrls: ['./cupon-edit.component.scss']
})
export class CuponEditComponent implements OnInit {

  cuponSubscription: Subscription;
  cupons: Cupon[];

  constructor( @Inject(MAT_DIALOG_DATA) public cupon: Cupon,
               private ref: MatDialogRef<CuponEditComponent>,
               private cuponService: CuponService,
               private toastService: ToastService) {}

  ngOnInit(): void {
    this.cuponService.getCupons();
    this.cuponSubscription = this.cuponService.getCuponsListener()
      .subscribe(cupons => {
        this.cupons = cupons;
      });
  }

  async edit(): Promise<void> {
  //   if (this.subCategory.slug) {
  //   await this.subCategoryService.updateSubCategory(this.subCategory.slug, this.subCategory);
  // } else {
    await this.cuponService.createCupon(this.cupon);
  // }
    this.ref.close();
}


  addEvent(event: MatDatepickerInputEvent<Date>): void {
    this.cupon.expire = event.value as Date;
  }

}
