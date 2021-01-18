import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private angularFirebaseAuth: AngularFireAuth) {
  }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.canActivateChild(route, state);
  }

  public async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isAuth = await this.angularFirebaseAuth.authState.pipe(first()).toPromise();
    if (!isAuth) {
      this.router.navigate(['admin/login']);
    }
    return true;
  }
}
