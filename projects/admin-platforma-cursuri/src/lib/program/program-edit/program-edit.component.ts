import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Price} from '../../../../../common/price';
import {PriceService} from '../../services/preturi';
import {ToastService} from 'angular-toastify';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
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
               private toastService: ToastService,
               private authService: AuthService) {}

  authSubscription: Subscription;
  token: string = '';

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
        });
  }


  async edit(): Promise<void> {
    if (this.program.slug) {
      await this.programService.programUpdate(this.program.slug, this.program, this.token);
    } else {
      await this.programService.programCreate(this.program, this.token);
    }
    this.ref.close();
  }

  ngOnDestroy(): void {
    if  (this.authSubscription)  {
      this.authSubscription.unsubscribe();
    }
  }
}
