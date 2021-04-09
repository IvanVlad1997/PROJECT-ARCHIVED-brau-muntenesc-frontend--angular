import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../../common/user';

@Component({
  selector: 'lib-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.scss']
})
export class QrDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public user: User,
               private ref: MatDialogRef<QrDialogComponent>) { }


  ngOnInit(): void {
  }

}
