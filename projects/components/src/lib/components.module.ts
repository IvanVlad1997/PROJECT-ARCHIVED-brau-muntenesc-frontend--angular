import {NgModule} from '@angular/core';
import {HeaderImageCircleComponent} from './header-image-circle/header-image-circle.component';
import {RouterModule} from "@angular/router";
import {routes} from "./routes";


@NgModule({
  declarations: [HeaderImageCircleComponent],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: []
})
export class ComponentsModule {
}
