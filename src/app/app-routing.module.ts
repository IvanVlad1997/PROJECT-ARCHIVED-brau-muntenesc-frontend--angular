import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {routes} from './routes';


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
