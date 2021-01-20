import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'lib-app-info-dialog',
  templateUrl: './app-info-dialog.component.html',
  styleUrls: ['./app-info-dialog.component.scss']
})
export class AppInfoDialogComponent  {

  hasDevices: boolean;
  hasPermission: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
  ) {
    this.hasDevices = data.hasDevices;
    this.hasPermission = data.hasPermission;
  }

}
