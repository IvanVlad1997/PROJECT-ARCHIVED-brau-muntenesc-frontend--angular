import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {TOKEN} from '../app.token';
import {Token} from '../../../projects/auth/src/lib/services/token';


@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private angularFirebaseAuth: AngularFireAuth,
              @Inject(TOKEN) private tokenStorage: Token) {
  }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.canActivateChild(route, state);
  }


  public async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    // TODO : userState - de ce trebuie?!
    const userState = await this.angularFirebaseAuth.authState.pipe(first()).toPromise();
    await this.authService.getAdmin( await this.tokenStorage.token.getValue());
    const isAdmin = await this.authService.isAdmin.getValue();
    if (isAdmin) {
      return true;
      }
    await this.router.navigate(['/']);
    return false;
    }
}
