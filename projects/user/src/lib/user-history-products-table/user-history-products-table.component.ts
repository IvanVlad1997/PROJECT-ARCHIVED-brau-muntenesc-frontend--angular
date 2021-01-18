import {Component, Input, OnInit} from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {User} from '../../../../common/user';
import {Order} from '../../../../common/order';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'lib-user-history-products-table',
  templateUrl: './user-history-products-table.component.html',
  styleUrls: ['./user-history-products-table.component.scss']
})
export class UserHistoryProductsTableComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @Input() order: Order;

  user: User;

  ngOnInit(): void {
    console.log(this.order)
    this.user = this.authService.user.getValue()
    console.log(this.user)
  }

  generatePDF(): void {
    let amount: number;
    if (this.order.paymentIntent.description === 'amountForCash') {
      amount = this.order.paymentIntent.amount;
    } else {
      amount = this.order.paymentIntent.amount / 100;
    }
    const docDefinition = {
      content: [
        {
          text: 'Brâu Muntenesc',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Factură',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Detalii despre client',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              { text: this.user.email },
            ],
            // [
            //   {
            //     text: `Date: ${new Date().toLocaleString()}`,
            //     alignment: 'right'
            //   },
            //   // {
            //   //   text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
            //   //   alignment: 'right'
            //   // }
            // ]
          ]
        },
        {
          text: 'Detalii despre comandă',
          style: 'sectionHeader'
        },
        {
          text: `Date: ${new Date().toLocaleString()}`
        },
        {
          text: `Id-ul comenzii: ${this.order.paymentIntent.client_secret}`,
        },
        {
          text: `Statusul comenzii: ${this.order.orderStatus}`,
        },
        {
          text: `Total de plată: ${amount}`,
        },
        {
          text: 'Produse',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Produs', 'Preț', 'Cantitate', 'Sumă produs'],
              ...this.order.products.map(p => ([p.product.title, p.product.price, p.count, (p.product.price * p.count).toFixed(2)])),
              // [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
            ]
          }
        },


      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }

    };

    pdfMake.createPdf(docDefinition).open();
  }


}
