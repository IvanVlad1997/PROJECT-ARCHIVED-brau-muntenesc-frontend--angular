import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GalerieVideoEvenimente} from '../../../../../common/galerie-video-evenimente';
import {User} from '../../../../../common/user';

@Component({
  selector: 'lib-cursanti-calendar',
  templateUrl: './cursanti-calendar.component.html',
  styleUrls: ['./cursanti-calendar.component.scss']
})
export class CursantiCalendarComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public user: User,
               private ref: MatDialogRef<CursantiCalendarComponent>) { }


  ngOnInit(): void {
    console.log(this.user)

  }

}
