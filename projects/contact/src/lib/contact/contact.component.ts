import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
