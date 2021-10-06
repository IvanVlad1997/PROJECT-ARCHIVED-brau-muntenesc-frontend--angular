import { NgModule } from '@angular/core';
import {ContactComponent} from './contact/contact.component';
import {ContactFromComponent} from './contact-from/contact-from.component';
import {ContactFormService} from './services/contact-form';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {routes} from "./routes";



@NgModule({
  declarations: [ContactComponent, ContactFromComponent],

    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FlexModule,
        MatIconModule,
        MatListModule,
        RouterModule,
        MatCardModule,
        CommonModule,
       RouterModule.forChild(routes),

    ],
  exports: [ContactComponent, ContactFromComponent]
})
export class ContactModule { }
