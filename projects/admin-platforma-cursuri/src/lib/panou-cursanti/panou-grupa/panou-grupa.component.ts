import {Component, Inject, OnDestroy, OnInit, } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../../../common/user';
import {ProgramService} from '../../services/program';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {Program} from '../../../../../common/program';
import {UserService} from '../../../../../user/src/lib/services/user';
import {CursantiService} from '../../services/panou-cursanti';

@Component({
  selector: 'lib-panou-grupa',
  templateUrl: './panou-grupa.component.html',
  styleUrls: ['./panou-grupa.component.scss']
})
export class PanouGrupaComponent implements OnInit, OnDestroy{
  private programSub: Subscription;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private programService: ProgramService,
               private authService: AuthService,
               private userService: UserService,
               private ref: MatDialogRef<PanouGrupaComponent>,
               private cursantiService: CursantiService) { }

  authSubscription: Subscription;
  token: string = '';
  programs: Program[];

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated
      .subscribe(
        (token) => {
          this.token = token;
          if (token !== '') {
            this.loadPrograms(token);
          }
        });
  }

  loadPrograms(token: string): void {
    this.programService.getPrograms();
    this.programSub = this.programService.getProgramListener()
      .subscribe((c) => {
             this.programs = c;
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.programSub) {
      this.programSub.unsubscribe();
    }
  }

  sendInfo(): void {
    this.userService.changeGrupa(this.data.user.group, this.token, this.data.user.email);
    this.ref.close();
    this.cursantiService.getUsers(this.token, this.data.context.selectedProgram);
  }
}

