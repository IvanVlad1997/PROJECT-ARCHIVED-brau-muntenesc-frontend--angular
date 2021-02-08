import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'lib-cursuri',
  templateUrl: './cursuri.component.html',
  styleUrls: ['./cursuri.component.scss']
})
export class CursuriComponent implements OnInit {



  @ViewChild('options', {static: true})
  public options: TemplateRef<any>;

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }
}


