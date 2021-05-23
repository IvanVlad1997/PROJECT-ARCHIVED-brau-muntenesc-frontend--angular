// import {AuthService} from './auth';
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import {HttpClient} from '@angular/common/http';
// import {TestBed} from '@angular/core/testing';
// import {Test} from 'tslint';
// import {UserManager} from './user-manager';
// import firebase from 'firebase';
// import {User} from '../../../../common/user';
// import {RouterTestingModule} from '@angular/router/testing';
// import {AngularFireAuth} from '@angular/fire/auth';
// import {ToastService} from 'angular-toastify';
// import {NodemailerHelper} from '../../../../../src/app/services/nodemailer-helper';
// import {Eveniment} from '../../../../common/events';
// import {GoogleAnalyticEventsService} from '../../../../../src/app/services/google-analytic-events.service';
// import {NavigationExtras, Router} from '@angular/router';
// import {Token} from './token';
// import {BehaviorSubject} from 'rxjs';
// import Spy = jasmine.Spy;
//
// fdescribe('AuthService', () => {
//
//   let authService: AuthService;
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;
//   let router: Partial<Router> = {
//     config: [],
//     errorHandler(error: any): any {
//     },
//     events: undefined,
//     // location: undefined,
//     // malformedUriErrorHandler(error: URIError, urlSerializer: UrlSerializer, url: string): UrlTree {
//     //   return undefined;
//     // },
//     navigated: false,
//     onSameUrlNavigation: undefined,
//     paramsInheritanceStrategy: undefined,
//     relativeLinkResolution: undefined,
//     routeReuseStrategy: undefined,
//     routerState: undefined,
//     urlHandlingStrategy: undefined,
//     urlUpdateStrategy: undefined,
//     // createUrlTree(commands: any[], navigationExtras?: UrlCreationOptions): UrlTree {
//     //   return undefined;
//     // },
//     // dispose(): void {
//     // },
//     // getCurrentNavigation(): Navigation | null {
//     //   return undefined;
//     // },
//     // initialNavigation(): void {
//     // },
//     // isActive(url: string | UrlTree, exact: boolean): boolean {
//     //   return false;
//     // },
//     navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
//       return Promise.resolve(false);
//     },
//     // navigateByUrl(url: string | UrlTree, extras?: NavigationBehaviorOptions): Promise<boolean> {
//     //   return Promise.resolve(false);
//     // },
//     // ngOnDestroy(): void {
//     // },
//     // parseUrl(url: string): UrlTree {
//     //   return undefined;
//     // },
//     // resetConfig(config: Routes): void {
//     // },
//     // serializeUrl(url: UrlTree): string {
//     //   return '';
//     // },
//     // setUpLocationChangeListener(): void {
//     // },
//     // get url(): string {
//     //   return '';
//     // }
//
//   };
//   let toastService: Partial<ToastService> = {
//     dismissAllEvent: undefined, toastAddedEvent: undefined, default(message: string): void {
//     }, dismissAll(): void {
//     }, error(message: string): void {
//     }, info(message: string): void {
//     }, success(message: string): void {
//     }, warn(message: string): void {
//     }
//
//   }
//   let angularFireAuth: Partial<AngularFireAuth> = {
//     app: Promise.resolve(undefined),
//     applyActionCode<K>(args: any): ReturnType<firebase.auth.Auth["applyActionCode"]> {
//       return Promise.resolve(undefined);
//     },
//     authState: undefined,
//     checkActionCode<K>(args: any): ReturnType<firebase.auth.Auth["checkActionCode"]> {
//       return Promise.resolve(undefined);
//     },
//     confirmPasswordReset<K>(args: any): ReturnType<firebase.auth.Auth["confirmPasswordReset"]> {
//       return Promise.resolve(undefined);
//     },
//     createUserWithEmailAndPassword<K>(args: any): ReturnType<firebase.auth.Auth["createUserWithEmailAndPassword"]> {
//       return Promise.resolve(undefined);
//     },
//     credential: undefined,
//     currentUser: undefined,
//     fetchSignInMethodsForEmail<K>(args: any): ReturnType<firebase.auth.Auth["fetchSignInMethodsForEmail"]> {
//       return Promise.resolve(undefined);
//     },
//     // getRedirectResult<K>(args: any): ReturnType<firebase.auth.Auth["getRedirectResult"]> {
//     //   return Promise.resolve(undefined);
//     // },
//     idToken: undefined,
//     idTokenResult: undefined,
//     isSignInWithEmailLink<K>(args: any): Promise<ReturnType<firebase.auth.Auth["isSignInWithEmailLink"]>> {
//       return Promise.resolve(undefined);
//     },
//     languageCode: undefined,
//     onAuthStateChanged<K>(args: any): Promise<ReturnType<firebase.auth.Auth["onAuthStateChanged"]>> {
//       return Promise.resolve(undefined);
//     },
//     onIdTokenChanged<K>(args: any): Promise<ReturnType<firebase.auth.Auth["onIdTokenChanged"]>> {
//       return Promise.resolve(undefined);
//     },
//     sendPasswordResetEmail<K>(args: any): ReturnType<firebase.auth.Auth["sendPasswordResetEmail"]> {
//       return Promise.resolve(undefined);
//     },
//     sendSignInLinkToEmail<K>(args: any): ReturnType<firebase.auth.Auth["sendSignInLinkToEmail"]> {
//       return Promise.resolve(undefined);
//     },
//     setPersistence<K>(args: any): ReturnType<firebase.auth.Auth["setPersistence"]> {
//       return Promise.resolve(undefined);
//     },
//     settings: Promise.resolve(undefined),
//     signInAndRetrieveDataWithCredential<K>(args: any): ReturnType<firebase.auth.Auth["signInAndRetrieveDataWithCredential"]> {
//       return Promise.resolve(undefined);
//     },
//     // signInAnonymously<K>(args: any): ReturnType<firebase.auth.Auth["signInAnonymously"]> {
//     //   return Promise.resolve(undefined);
//     // },
//     signInWithCredential<K>(args: any): ReturnType<firebase.auth.Auth["signInWithCredential"]> {
//       return Promise.resolve(undefined);
//     },
//     signInWithCustomToken<K>(args: any): ReturnType<firebase.auth.Auth["signInWithCustomToken"]> {
//       return Promise.resolve(undefined);
//     },
//     signInWithEmailAndPassword<K>(args: any): ReturnType<firebase.auth.Auth["signInWithEmailAndPassword"]> {
//       return Promise.resolve(undefined);
//     },
//     signInWithEmailLink<K>(args: any): ReturnType<firebase.auth.Auth["signInWithEmailLink"]> {
//       return Promise.resolve(undefined);
//     },
//     signInWithPhoneNumber<K>(args: any): ReturnType<firebase.auth.Auth["signInWithPhoneNumber"]> {
//       return Promise.resolve(undefined);
//     },
//     signInWithPopup<K>(args: any): ReturnType<firebase.auth.Auth["signInWithPopup"]> {
//       return Promise.resolve(undefined);
//     },
//     signInWithRedirect<K>(args: any): ReturnType<firebase.auth.Auth["signInWithRedirect"]> {
//       return Promise.resolve(undefined);
//     },
//     // signOut<K>(args: any): ReturnType<firebase.auth.Auth["signOut"]> {
//     //   return () Promise.resolve(undefined );
//     // },
//     tenantId: undefined,
//     updateCurrentUser<K>(args: any): ReturnType<firebase.auth.Auth["updateCurrentUser"]> {
//       return Promise.resolve(undefined);
//     },
//     // useDeviceLanguage<K>(args: any): Promise<ReturnType<firebase.auth.Auth["useDeviceLanguage"]>> {
//     //   return Promise.resolve(undefined);
//     // },
//     useEmulator<K>(args: any): Promise<ReturnType<firebase.auth.Auth["useEmulator"]>> {
//       return Promise.resolve(undefined);
//     },
//     user: undefined,
//     verifyPasswordResetCode<K>(args: any): ReturnType<firebase.auth.Auth["verifyPasswordResetCode"]> {
//       return Promise.resolve(undefined);
//     }
//   }
//
//   let nodemailerHelper: Partial<NodemailerHelper> = {
//     infoEventRequest(event: Eveniment): void {
//     // }, infoFiscalBill(order: Order, email: string): void {
//     }, infoNewAccount(email: string, telNum: number, isDancer: boolean): void {
//     }, infoPaymaentCourse(data): void {
//     }, targetByIdPresence(presence, _id: string): void {
//     // }, targetMailOnlineOrder(email: string, order: Order): void {
//     }, targetMailPaymentOnlineCourse(payment, email): void {
//     }, targetNewAccount(email): void {
//     }, targetNewOrder(res, email: string): void {
//     }
//
//   }
//
//   let userManager: Partial<UserManager> = {
//     async createOrUpdateUser(userCredential: firebase.auth.UserCredential): Promise<User> {
//       return Promise.resolve(undefined);
//     }, async getCurrentUser(token): Promise<User> {
//       return Promise.resolve(undefined);
//     }, async updateMany(email: string, telNum: number, address: string[], isDancer: boolean, name: string): Promise<any> {
//       return Promise.resolve(undefined);
//     }
//   };
//
//   let googleAnalyticsService: Partial<GoogleAnalyticEventsService> = {
//     getUser(): string {
//       return '';
//     }, login(user: User): void {
//     }, navigate(user: User): void {
//     }, resetPassword(email): void {
//     }, signUp(name): void {
//     }, updatePassword(): void {
//     }
//   }
//
//   let userStorage: Storage = {
//     getItem(key: string): string | null {
//       return undefined;
//     }, key(index: number): string | null {
//       return undefined;
//     }, length: 0, removeItem(key: string): void {
//     }, setItem(key: string, value: string): void {
//     }, clear(): void {
//     }
//   }
//
//   let token: Token = {
//     token: undefined
//   };
//
//   beforeEach(() => {
//     authService = new AuthService(userManager as UserManager, router as Router, angularFireAuth as AngularFireAuth, toastService as ToastService, nodemailerHelper as NodemailerHelper,  googleAnalyticsService as GoogleAnalyticEventsService, userStorage,  token  )
//   });
//
//   it('should logout', () => {
//     let removeItemFromUserStorage: Spy<(key: string) => void> = jasmine.createSpy('remove item', userStorage.removeItem)
//
//     authService.logout();
//     expect(removeItemFromUserStorage).toHaveBeenCalledWith('current');
//     expect(removeItemFromUserStorage).toHaveBeenCalledTimes(1);
//   })
// });
//
