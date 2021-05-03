import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {USER_STORAGE} from '../app.token';
import {first} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              @Inject(USER_STORAGE) private userStorage: Storage,
              private angularFirebaseAuth: AngularFireAuth) {
  }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.canActivateChild(route, state);
  }

  public async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    let user = JSON.parse(this.userStorage.getItem('current'));
    // TODO: wtf
    // if (!user) {
    //   await this.router.navigate(['/auth/login']);
    //   return false;
    // }
    return true;
  }
}
