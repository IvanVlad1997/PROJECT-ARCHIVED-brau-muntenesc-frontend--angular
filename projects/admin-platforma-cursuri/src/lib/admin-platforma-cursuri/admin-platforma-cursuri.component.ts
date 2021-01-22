import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'lib-admin-platforma-cursuri',
  templateUrl: './admin-platforma-cursuri.component.html',
  styleUrls: ['./admin-platforma-cursuri.component.scss']
})
export class AdminPlatformaCursuriComponent implements OnInit {

  constructor() { }
  @ViewChild('options' , {static : true})
  public options: TemplateRef<any>;

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  ngOnInit(): void {
  }
}
