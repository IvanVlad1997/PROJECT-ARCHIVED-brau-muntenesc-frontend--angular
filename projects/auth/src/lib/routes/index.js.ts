import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';

export const routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
];
