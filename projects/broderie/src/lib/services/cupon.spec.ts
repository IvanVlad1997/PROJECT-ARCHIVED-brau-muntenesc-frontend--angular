//  import {HttpClient} from '@angular/common/http';
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import {TestBed} from '@angular/core/testing';
// import {CuponService} from './cupon';
// import {AuthService} from '../../../../auth/src/lib/services/auth';
// import {ToastService} from 'angular-toastify';
//
// fdescribe('CuponService', () => {
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;
//   let cuponService: CuponService;
//   let authService: AuthService;
//   let toastService: ToastService;
//
//   beforeEach(() => {
//     authService = {
//       isAdmin: undefined,
//       isAuthenticated: undefined,
//       tokenAdmin: undefined,
//       user: undefined,
//       getAdmin(token: string): void {
//       },
//       getCurrentUser(token: string): void {
//       },
//       async login(email: string, password: string, other?: any): Promise<void> {
//         return Promise.resolve(undefined);
//       },
//       async loginWithGoogle(): Promise<void> {
//         return Promise.resolve(undefined);
//       },
//       async logout(): Promise<void> {
//         return Promise.resolve(undefined);
//       },
//       async resetPassword(email: string): Promise<void> {
//         return Promise.resolve(undefined);
//       }, roleBaseRedirect(role): void {
//       },
//       async signUp(email: string, password: string, telNum: number, address: string[], isDancer: boolean, name: string): Promise<void> {
//         return Promise.resolve(undefined);
//       },
//       updateMany(email: string, telNum: number, address: string[], isDancer: boolean, name: string): void {
//       },
//       async updatePassword(password: string): Promise<void> {
//         return Promise.resolve(undefined);
//       }
//     };
//     toastService = {
//       dismissAllEvent: undefined, toastAddedEvent: undefined, default(message: string): void {
//       }, dismissAll(): void {
//       }, error(message: string): void {
//       }, info(message: string): void {
//       }, success(message: string): void {
//       }, warn(message: string): void {
//       }
//     };
//
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule]
//     });
//     httpClient = TestBed.inject(HttpClient);
//     httpTestingController = TestBed.inject(HttpTestingController);
//     cuponService = new CuponService(httpClient, authService, toastService);
//   });
//
//   it('should getCupons', () => {
//
//   })
// });
