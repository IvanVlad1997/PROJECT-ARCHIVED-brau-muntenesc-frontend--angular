import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'lib-cursuri-udemy',
  templateUrl: './cursuri-udemy.component.html',
  styleUrls: ['./cursuri-udemy.component.scss']
})
export class CursuriUdemyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
