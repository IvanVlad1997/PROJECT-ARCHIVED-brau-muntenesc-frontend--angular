import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastService} from 'angular-toastify';
import {Subscription} from 'rxjs';
import {Program} from '../../../../../common/program';
import {ProgramService} from '../../services/program';

@Component({
  selector: 'lib-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.scss']
})
export class ProgramEditComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public program: Program,
               private ref: MatDialogRef<ProgramEditComponent>,
               private programService: ProgramService,
               private toastService: ToastService) {}

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
  }


  async edit(): Promise<void> {
    if (this.program.slug) {
      await this.programService.programUpdate(this.program.slug, this.program);
    } else {
      await this.programService.programCreate(this.program);
    }
    this.ref.close();
  }

  ngOnDestroy(): void {
  }
}
