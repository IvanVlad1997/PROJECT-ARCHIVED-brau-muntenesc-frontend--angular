import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OptionsAwareComponent} from '../../../../common/metadata-aware';

@Component({
  selector: 'lib-auth',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OptionsAwareComponent {

  constructor() { }

  @ViewChild('options' , {static : true})
  public options: TemplateRef<any>;

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  ngOnInit(): void {
  }

}
