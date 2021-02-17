import { NgModule } from '@angular/core';
import { PaginaPrincipalaComponent } from './pagina-principala/pagina-principala.component';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {EvenimenteComponent} from './evenimente/evenimente.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {PlyrModule} from 'ngx-plyr';
import {MatButtonModule} from '@angular/material/button';
import { GalerieVideoComponent } from './galerie-video/galerie-video.component';
import {CommonModule} from "@angular/common";
import { FormularEvenimenteComponent } from './formular-evenimente/formular-evenimente.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { InformatiiComponent } from './informatii/informatii.component';
import { CalendarComponent } from './calendar/calendar.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { BasicDirectiveDirective } from './directives/basic-directive.directive'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [EvenimenteComponent, PaginaPrincipalaComponent, GalerieVideoComponent, FormularEvenimenteComponent, InformatiiComponent, CalendarComponent, BasicDirectiveDirective],
  imports: [
    RouterModule.forChild(routes),
    MatListModule,
    MatIconModule,
    FlexModule,
    PlyrModule,
    MatButtonModule,
    ExtendedModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    FullCalendarModule
  ],
  exports: [EvenimenteComponent]
})
export class EvenimenteModule { }
