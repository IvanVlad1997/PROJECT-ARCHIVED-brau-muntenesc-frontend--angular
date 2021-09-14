import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "../../../../auth/src/lib/services/auth";

@Component({
  selector: 'lib-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor( private authService: AuthService) { }

  @Input()
  sidenav: MatSidenav;

  @Input()
  isAuthenticated: boolean;

  @Input()
  isAdmin: boolean;

  @Input()
  options: TemplateRef<any>;


  ngOnInit(): void {
  }


  logout(): void {
    this.authService.logout();
  }
}
