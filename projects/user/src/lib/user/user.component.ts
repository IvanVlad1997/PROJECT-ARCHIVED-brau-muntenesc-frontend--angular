import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OptionsAwareComponent} from '../../../../common/metadata-aware';

@Component({
  selector: 'lib-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OptionsAwareComponent {

  constructor() { }

  @ViewChild('options' , {static : true})
  public options: TemplateRef<any>;

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  ngOnInit(): void {
  }

}
