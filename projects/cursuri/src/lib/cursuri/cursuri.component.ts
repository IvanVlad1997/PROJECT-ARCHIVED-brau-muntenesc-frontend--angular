import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'lib-cursuri',
  templateUrl: './cursuri.component.html',
  styleUrls: ['./cursuri.component.scss']
})
export class CursuriComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('options', {static: true})
  public options: TemplateRef<any>;

}
