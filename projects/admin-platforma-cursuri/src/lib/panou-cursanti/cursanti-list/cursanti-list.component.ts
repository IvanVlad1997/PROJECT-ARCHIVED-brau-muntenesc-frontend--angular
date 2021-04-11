import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../../../auth/src/lib/services/auth';
import {ColDef} from 'ag-grid-community';
import {Subscription} from 'rxjs';
import {User} from '../../../../../common/user';
import {CursantiService} from '../../services/panou-cursanti';
import {CursantiListActionsComponent} from '../cursanti-list-actions/cursanti-list-actions.component';
import {UltimaPlataComponent} from '../ultima-plata/ultima-plata.component';
import {ProgramService} from '../../services/program';
import {Program} from '../../../../../common/program';
import {distinct, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'lib-cursanti-list',
  templateUrl: './cursanti-list.component.html',
  styleUrls: ['./cursanti-list.component.scss']
})
export class CursantiListComponent implements OnInit, OnDestroy {
  private programSub: Subscription;
  public selectedProgram: Program;

  constructor(private dialog: MatDialog,
              private cursantiService: CursantiService,
              private programService: ProgramService) { }

  defaultColDef: ColDef = {
    minWidth: 200,
    resizable: true,
  };

  columnDefs = [
    { headerName: 'Actions',
      width: 240,
      cellRendererFramework: CursantiListActionsComponent
    },
    { headerName: 'Nume',
      field: 'name',
      sortable: true,
      filter: true,
    },
    { headerName: 'Grupă',
      field: 'group',
      valueFormatter: params => {
        if (params && params.data && params.data.group && params.data.group) {
          return `${params.data.group.category} ${params.data.group.interval}`;
        }
        else  {
          return '-';
        }
      },
    },
    {
      headerName: 'Email',
      field: 'email',
    },
    {
      headerName: 'Număr',
      field: 'telNum',
      flex: 1
    },
    {
      headerName: 'Ultima Plată',
      cellRendererFramework: UltimaPlataComponent,
      width: 150
    }

  ];

  rowData: any;
  userSubscription: Subscription;
  authSubscription: Subscription;
  token: string = '';
  users: User[] = [];
  programs: Program[];

  ngOnInit(): void {
    this.loadPrograms();
    this.loadUsers();
  }

  loadPrograms(): void {
    this.programService.getPrograms();
    this.programSub = this.programService.getProgramListener()
       .subscribe((c) => {
        this.programs = c;
      });
  }

  loadUsers(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    this.cursantiService.getUsers(undefined);
    this.userSubscription = this.cursantiService.getUsersListener()
      .pipe(
        distinct()
      )
      .subscribe(users => {
        this.users = users;
        this.rowData = this.users;
      });
  }


  ngOnDestroy(): void {
    if  (this.userSubscription)  {
      this.userSubscription.unsubscribe();
    }
    if  (this.programSub)  {
      this.programSub.unsubscribe();
    }
  }


  valueChange(e: Program): void {
    this.selectedProgram = e;
    this.cursantiService.getUsers( e );
  }
}



