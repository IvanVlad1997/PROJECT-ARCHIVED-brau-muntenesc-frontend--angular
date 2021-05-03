import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {TOKEN, USER_STORAGE} from '../app.token';
import {Token} from '../../../projects/auth/src/lib/services/token';


@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private angularFirebaseAuth: AngularFireAuth,
              @Inject(TOKEN) private tokenStorage: Token,
              @Inject(USER_STORAGE) private userStorage: Storage) {
  }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.canActivateChild(route, state);
  }


  public async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    let user = JSON.parse(this.userStorage.getItem('current'));
    if (user && user.role === 'admin') {
      return true;
    }
    await this.router.navigate(['/']);
    return false;
  }
}
