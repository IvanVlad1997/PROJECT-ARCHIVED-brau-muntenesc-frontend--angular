import { Component, OnInit } from '@angular/core';
import {FormularEvenimenteComponent} from "../../formular-evenimente/formular-evenimente.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'lib-cta-big-events',
  templateUrl: './cta-big-events.component.html',
  styleUrls: ['./cta-big-events.component.scss']
})
export class CtaBigEventsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  sendInfo(): void {
    this.dialog.open(FormularEvenimenteComponent,
      {
        disableClose: true
      });
  }

}
