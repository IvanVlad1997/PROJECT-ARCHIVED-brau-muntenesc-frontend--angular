import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ColDef} from "ag-grid-community";
import {ContactForm} from "../../../../common/contact-form";
import {ContactFormService} from "../../../../contact/src/lib/services/contact-form";

@Component({
  selector: 'lib-contac-form-list',
  templateUrl: './contac-form-list.component.html',
  styleUrls: ['./contac-form-list.component.scss']
})
export class ContacFormListComponent implements OnInit, OnDestroy {

  constructor(private contactFormService: ContactFormService,
  ) {
  }

  subscription: Subscription;
  contactForms: ContactForm[] = [];

  defaultColDef: ColDef = {
    resizable: true
  };

  columnDefs = [
    {
      headerName: 'Nume',
      field: 'name',
      sortable: true,
      filter: true,
      flex: 1
    },
    {
      headerName: 'Email',
      field: 'email',
      flex: 1
    },
    {
      headerName: 'Număr de telefon',
      field: 'telephoneNumber',
      flex: 1
    },
    {
      headerName: 'Mesaj',
      field: 'message',
      flex: 1
    },

  ];

  rowData: any;
  token: string = '';

  async ngOnInit(): Promise<void> {
    await this.loadContactForms();
  }

  async loadContactForms(): Promise<void> {
    await this.contactFormService.getContactForms();
    this.subscription = this.contactFormService.getContactFormListener()
      .subscribe(contactForms => {
        this.contactForms = contactForms;
        this.rowData = this.contactForms;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}



