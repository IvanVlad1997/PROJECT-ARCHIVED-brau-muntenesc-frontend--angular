import {Component, Inject, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';
import {TypeGuards} from '../services/type-guard';
import {TOKEN} from '../app.token';
import {Token} from '../../../projects/auth/src/lib/services/token';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  constructor(private router: Router,
              private authService: AuthService,
              @Inject(TOKEN) private token: Token
  ) { }



  openedSide: boolean = false;
  object: object;
  isAuthenticated: boolean = false;
  isAuthSubscription: Subscription;
  isAdminSubscription: Subscription;
  isAdmin: boolean = false;

  get header(): TemplateRef<any> {
    if (this.object && TypeGuards.isHeaderAwareComponent(this.object)) {
      return this.object.header;
    }
    return undefined;
  }

  get search(): TemplateRef<any> {
    if (this.object && TypeGuards.isSearchAwareComponent(this.object)) {
      return this.object.search;
    }
    return undefined;
  }

  get options(): TemplateRef<any> {
    if (this.object && TypeGuards.isOptionsAwareComponent(this.object)) {
      return this.object.options;
    }
    return undefined;
  }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      if (value instanceof NavigationStart) {
        this.openedSide = false;
      }
    });
    this.token.token.pipe(takeUntil(this.onDestroy$)).subscribe(
      (token) => {
        if (token !== '') {
          this.isAuthenticated = true;
        } else  {
          this.isAuthenticated = false;
        }
      }
    )

    this.isAdminSubscription = this.authService.isAdmin
      .subscribe((isAdm: boolean) => {
        if (isAdm) {
          this.isAdmin = true;
        } else  {
          this.isAdmin = false;
        }
      });


  }

  public componentChangeed(object: object): void {
    this.object = object;
  }

  public clearComponent(): void {
    delete this.object;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.isAuthSubscription.unsubscribe();
    this.isAdminSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
