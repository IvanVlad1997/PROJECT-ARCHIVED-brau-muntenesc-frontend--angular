import { Component } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import compareAsc from 'date-fns/compareAsc'

@Component({
  selector: 'lib-ultima-plata',
  templateUrl: './ultima-plata.component.html',
  styleUrls: ['./ultima-plata.component.scss']
})
export class UltimaPlataComponent implements AgFrameworkComponent<BaseColDefParams> {


  constructor() {
  }

  payHistory: any[] = []
  length: number;
  date: Date;
  days20: any;
  isLate: boolean = false;

  agInit(params: BaseColDefParams): void {
    if (params && params.data && params.data.payHistory.length > 0) {
      this.payHistory = params.data.payHistory;
      this.length = this.payHistory.length;
      this.date = this.payHistory[this.length - 1].payment.date;
      const aux =  new Date(this.date)
      this.days20 = aux.setDate(aux.getDate() + 20);
      const result: number | any = compareAsc(this.days20, new Date());
      if (result === -1) {
        this.isLate = true;
      }
    }
  }

}
