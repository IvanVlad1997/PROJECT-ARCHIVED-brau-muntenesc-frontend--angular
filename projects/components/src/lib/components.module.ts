import {NgModule} from '@angular/core';
import {HeaderImageCircleComponent} from './header-image-circle/header-image-circle.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes";
import { FlipCardComponent } from './flip-card/flip-card.component';
import {ExtendedModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [HeaderImageCircleComponent, FlipCardComponent],
  imports: [
    ExtendedModule,
    CommonModule,
    // RouterModule.forChild(routes),
  ],
  exports: [FlipCardComponent]
})
export class ComponentsModule {
}
