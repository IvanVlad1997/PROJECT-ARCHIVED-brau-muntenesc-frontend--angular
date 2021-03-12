import {Component, OnInit, ViewChild} from '@angular/core';
import {PlyrComponent} from 'ngx-plyr';
import {QrDialogComponent} from '../../../../admin-platforma-cursuri/src/lib/panou-cursanti/qr-dialog/qr-dialog.component';
import {FormularEvenimenteComponent} from '../formular-evenimente/formular-evenimente.component';
import {MatDialog} from '@angular/material/dialog';
import {InformatiiComponent} from '../informatii/informatii.component';

@Component({
  selector: 'lib-pagina-principala',
  templateUrl: './pagina-principala.component.html',
  styleUrls: ['./pagina-principala.component.scss']
})
export class PaginaPrincipalaComponent implements OnInit {

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  videoSources: Plyr.Source[] = [
    {
      src: 'ncA6-WTK1v8',
      provider: 'youtube',
    },
  ];

  videoSources1: Plyr.Source[] = [
    {
      src: '587-Oo-i_Iw',
      provider: 'youtube',
    },
  ];

  options = {
    autoplay: true,
    volume: 0.5,
    quality: 720
  };

  options1 = {
    volume: 0.5,
    quality: 720
  };
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }



  sendInfo(): void {
    this.dialog.open(FormularEvenimenteComponent,
      {
        disableClose: true
      });
  }

  info(): void {
    this.dialog.open(InformatiiComponent,
      {
        disableClose: true
      });
  }
}
