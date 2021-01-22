import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './routes/index.js';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {FlexModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FlexModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatCheckboxModule

    ],
  exports: [
    LoginComponent,
    SignupComponent,
  ],
  providers: [
  ]
})
export class AuthModule { }
