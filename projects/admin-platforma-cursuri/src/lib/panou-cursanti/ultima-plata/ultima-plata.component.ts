import { Component } from '@angular/core';
import {AgFrameworkComponent} from 'ag-grid-angular';
import {BaseColDefParams} from 'ag-grid-community/dist/lib/entities/colDef';
import {differenceInMonths} from "date-fns";
import {differenceInYears} from "date-fns/fp";

@Component({
  selector: 'lib-ultima-plata',
  templateUrl: './ultima-plata.component.html',
  styleUrls: ['./ultima-plata.component.scss']
})
export class UltimaPlataComponent implements AgFrameworkComponent<BaseColDefParams> {


  constructor() {
  }

  payHistory: any[] = [];
  length: number;
  date: Date;
  days20: any;
  isLate: boolean = false;

  agInit(params: BaseColDefParams): void {
    if (params && params.data && params.data.payHistory.length > 0) {
      this.payHistory = params.data.payHistory;
      this.length = this.payHistory.length;
      this.date = this.payHistory[this.length - 1].payment.date;
      const today: Date =  new Date();
      let formattedDate: Date = new Date(this.date)
      if (differenceInMonths(formattedDate, today) !== 0) {
        this.isLate = true;
      }
      if (formattedDate.getMonth() !== today.getMonth() && differenceInYears(formattedDate, today) < 1) {
        this.isLate = true;
      }
    }
  }

}
