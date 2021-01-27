import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from '../../../../../common/user';

@Component({
  selector: 'lib-cursanti-calendar',
  templateUrl: './cursanti-calendar.component.html',
  styleUrls: ['./cursanti-calendar.component.scss']
})
export class CursantiCalendarComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public user: User) { }


}
