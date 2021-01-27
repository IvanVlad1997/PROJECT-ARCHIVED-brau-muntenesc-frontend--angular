import {Component, Input, OnInit} from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {User} from '../../../../common/user';
import {Order} from '../../../../common/order';
import {NodemailerService} from '../../../../admin/src/lib/services/nodemailer';
import {ToastService} from 'angular-toastify';
import {formatDate} from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'lib-user-history-products-table',
  templateUrl: './user-history-products-table.component.html',
  styleUrls: ['./user-history-products-table.component.scss']
})
export class UserHistoryProductsTableComponent implements OnInit {

  constructor(private authService: AuthService,
              private nodemailer: NodemailerService,
              private toastService: ToastService) { }

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
    const formattedDate = formatDate(new Date(), 'dd/MM/yyyy', 'ro-RO')
    const docDefinition = {
      content: [
        {
          text: 'Brâu Muntenesc',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Factură proformă',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: `Număr ${this.order.orderNumber}`,
          alignment: 'right'
        },
        {
          text: `Seria: BRAU`,
          alignment: 'right'
        },
        {
          text: `Dată: ${formattedDate}`,
          alignment: 'right'
        },
        {
          columns: [
            {
              text: 'Brâu Muntenesc SRL',
              style: 'sectionHeader'
            },
            {
              text: 'Detalii despre client',
              style: 'sectionHeader'
            }
          ],

        },
        {
          columns: [
            [
              { text: 'PLOIEȘTI str. MALU ROȘU nr.98 Bl.35B Ap.2' },
              { text: 'Județul: PRAHOVA' },
              { text: 'Nr.ord.reg.om./an: JS29/1810/2019' },
              { text: 'C.I.F: 41123710' },
              { text: 'Banca: ING BANK' },
              { text: 'Cod IBAN: RO73INGB0000999909056584' },
              { text: 'Capital Social: 200 lei' },
            ],
            [
              { text: `Cumpărător: ${this.user.name}` },
              { text: `Sediul/Adresa: ${this.user.address[1]}` },
              { text: `Email: ${this.user.email}` },
              { text: `Număr de telefon: ${this.user.telNum}` },
              // { text: 'Nr.ord.reg.om./an: .........' },
              // { text: 'C.I.F/ CNP: .......' },
              // { text: 'Banca: ........' },
              // { text: 'Cod IBAN: ........' },
            ],
          ]
        },
        {
          text: 'Detalii despre comandă',
          style: 'sectionHeader'
        },
        {
          text: `Id-ul comenzii: ${this.order._id}`,
        },
        {
          text: `Statusul comenzii: ${this.order.orderStatus}`,
        },
        {
          text: 'Produse',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              ['Produs', 'Preț', 'Cantitate', 'U.M.', 'Preț unitar(fără TVA)', 'Sumă produs'],
              ...this.order.products.map(p => ([p.product.title, p.product.price, p.count, 'buc.', p.product.price, (p.product.price * p.count).toFixed(2)])),
            ]
          }
        },
        {
          text: `Total de plată: ${amount}`,
          style: 'sectionHeader'
        },
        {
          text: `Firmă neplătitoare de TVA`,
        },
        {
          text: `Conform art. 319 alin. (29) din Legea nr. 227/2015 privind Codul Fiscal, factura este valabilă fără semnătură și ștampilă`
        },
        {
          text: `Date privind expediția: Curier`,
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


  sendInvoice(): void {
    this.nodemailer.infoMail('SOLICITARE FACTURA FISCALA', `<h1>COMANDA ${JSON.stringify(this.order)}</h1> <h1>EMAIL ${this.user.email}</h1>`)
    this.toastService.info(`Solicitarea a fost trimisă. Veți primi factura pe mail în cel mai scurt timp posibil. Dacă există nelămuriri, sunați la 0751105873.`)
  }
}
