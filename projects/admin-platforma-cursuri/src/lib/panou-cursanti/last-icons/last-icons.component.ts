import { Component } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../../../common/user';
import {QrDialogComponent} from '../qr-dialog/qr-dialog.component';
import {PanouGrupaComponent} from '../panou-grupa/panou-grupa.component';

@Component({
  selector: 'lib-last-icons',
  templateUrl: './last-icons.component.html',
  styleUrls: ['./last-icons.component.scss']
})
export class LastIconsComponent implements AgFrameworkComponent<BaseColDefParams> {
  private context: any;

  constructor(private dialog: MatDialog) {
  }

  user: User;

  agInit(params: BaseColDefParams): void {
    this.context = params.context;
    this.user = params.data;
  }

  generateQR(): void {
    this.dialog.open(QrDialogComponent,
      {
        data: this.user,
        disableClose: true
      });
  }

  changeGroup(): void {
    this.dialog.open(PanouGrupaComponent,
      {
        data: {
          user: this.user,
          context: this.context
        },
        disableClose: true
      });
  }
}
