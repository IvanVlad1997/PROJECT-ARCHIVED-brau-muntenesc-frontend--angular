import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private angularFirebaseAuth: AngularFireAuth) {
  }


  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.canActivateChild(route, state);
  }

  // TODO : problema prima conectare

  public async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const userState = await this.angularFirebaseAuth.authState.pipe(first()).toPromise();
    if (userState) {
      const token = await userState.getIdToken();
      await this.authService.getAdmin(token);
      const isAdmin = await this.authService.isAdmin.getValue();
      if (isAdmin) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
    }
}
