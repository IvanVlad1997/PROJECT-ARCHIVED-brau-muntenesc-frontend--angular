import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarcodeFormat} from '@zxing/library';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FormatsDialogComponent} from './formats-dialog/formats-dialog.component';
import {AppInfoDialogComponent} from './app-info-dialog/app-info-dialog.component';

@Component({
  selector: 'lib-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.scss']
})
export class QrScanComponent implements OnDestroy{
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
    private subscription: Subscription;

  constructor(private readonly dialog: MatDialog) { }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  // TODO: BS -> trebuie sa ia rezultatul doar daca e diferit
  onCodeResult(resultString: string): void {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string): void {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog(): void {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this.subscription = this.dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  openInfoDialog(): void {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this.dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
