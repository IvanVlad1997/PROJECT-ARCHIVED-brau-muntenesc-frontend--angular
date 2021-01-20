import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'lib-evenimente',
  templateUrl: './evenimente.component.html',
  styleUrls: ['./evenimente.component.scss']
})
export class EvenimenteComponent implements OnInit {

  constructor() { }

  @ViewChild('options' , {static : true})
  public options: TemplateRef<any>;

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  ngOnInit(): void {
  }

}
