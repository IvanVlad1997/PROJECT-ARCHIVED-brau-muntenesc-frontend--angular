import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'lib-admin-evenimente',
  templateUrl: './admin-evenimente.component.html',
  styleUrls: ['./admin-evenimente.component.scss']
})
export class AdminEvenimenteComponent implements OnInit {

  constructor() { }
  @ViewChild('options' , {static : true})
  public options: TemplateRef<any>;

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  ngOnInit(): void {
  }

}
