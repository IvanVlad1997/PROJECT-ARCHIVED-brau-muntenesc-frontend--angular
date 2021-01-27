import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ProiecteProgramareComponent} from '../proiecte-programare/proiecte-programare.component';
import {VideoSchiComponent} from '../video-schi/video-schi.component';

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

  openVideoSchi(): void {
    this.dialog.open(VideoSchiComponent)
  }

}
