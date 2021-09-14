import { NgModule } from '@angular/core';
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FooterComponent} from "./footer/footer.component";
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {AvatarModule} from "ngx-avatar";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [FooterComponent, SideNavComponent],
  imports: [
    FlexModule,
    MatDividerModule,
    CommonModule,
    RouterModule,
    ExtendedModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    AvatarModule
  ],
  exports: [FooterComponent, SideNavComponent, ]
})
export class LayoutModule { }
