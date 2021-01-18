import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'lib-cart-product-image-dialog',
  templateUrl: './cart-product-image-dialog.component.html',
  styleUrls: ['./cart-product-image-dialog.component.scss']
})
export class CartProductImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public image: string) { }

  ngOnInit(): void {
  }

}
