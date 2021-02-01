import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProiecteProgramareComponent} from '../proiecte-programare/proiecte-programare.component';
import {VideoSchiComponent} from '../video-schi/video-schi.component';
import {CursuriUdemyComponent} from '../imagine/cursuri-udemy.component';
import {FrozenLogicComponent} from '../frozen-logic/frozen-logic.component';

@Component({
  selector: 'lib-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @ViewChild('header', {static: true})
  public header: TemplateRef<any>;

  ngOnInit(): void {
  }

  openProiecte(): void {
    this.dialog.open(ProiecteProgramareComponent)
  }

  openFrozen(): void {
    this.dialog.open(FrozenLogicComponent)
  }


  openVideoSchi(): void {
    this.dialog.open(VideoSchiComponent,
      {
        data: {
          src: 'd99MSvw4eTM',
          title: 'Videoclip schi'
        }
      })
  }

  openVideoLicenta(): void {
    this.dialog.open(VideoSchiComponent,
      {
        data: {
          src: 'vQhfeJvNDyQ',
          title: 'Proiect de diplomă'
        }
      })
  }

  openUdemyImage(): void {
    this.dialog.open(CursuriUdemyComponent,
      {
        data: {
          src: 'https://i.imgur.com/ZINMClC.png',
          title: 'Cursuri Udemy'
        }
      })
  }

  openLicentaImage(): void {
    this.dialog.open(CursuriUdemyComponent,
      {
        data: {
          src: 'https://i.imgur.com/OkIur5N.jpg',
          title: 'Adeverință licență'
        }
      })
  }

  openDansuriImage(): void {
    this.dialog.open(CursuriUdemyComponent,
      {
        data: {
          src: 'https://i.imgur.com/sFEh9s2.jpg',
          title: 'Certificat instructor dans'
        }
      })
  }

  openAntreprenoriatImage(): void {
    this.dialog.open(CursuriUdemyComponent,
      {
        data: {
          src: 'https://i.imgur.com/priIr89.jpg',
          title: 'Certificat antreprenoriat'
        }
      })
  }

  openCV(): void {
    this.dialog.open(CursuriUdemyComponent,
      {
        data: {
          src: 'https://i.imgur.com/fsVOBnk.jpg',
          title: ''
        }
      })
  }
}
