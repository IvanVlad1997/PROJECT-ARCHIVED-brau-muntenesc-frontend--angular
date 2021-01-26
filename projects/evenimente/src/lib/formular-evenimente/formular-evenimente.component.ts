import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../common/user';
import {EventsService} from '../services/events';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {Eveniment} from '../../../../common/events';

@Component({
  selector: 'lib-formular-evenimente',
  templateUrl: './formular-evenimente.component.html',
  styleUrls: ['./formular-evenimente.component.scss']
})
export class FormularEvenimenteComponent implements OnInit {

  constructor(private ref: MatDialogRef<FormularEvenimenteComponent>,
              private eventsService: EventsService) { }

  nume: string;
  email: string;
  nrTel: number;
  evDate: string;
  restaurant: string;



  ngOnInit(): void {

  }

  sendInfo(): void {
    let event: Eveniment = {
      createdAt: undefined,
      name: this.nume,
      updatedAt: undefined,
      _v: undefined,
      _id: undefined,
      slug: undefined,
      email: this.email,
      nrTel: this.nrTel,
      evDate: this.evDate,
      restaurant: this.restaurant,
    }
    this.eventsService.createEvent(event)
    this.ref.close()
  }


}
