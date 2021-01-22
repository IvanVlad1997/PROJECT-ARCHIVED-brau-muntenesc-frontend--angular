import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class OverlayService {


  cartOverlayUpdate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  changeOverlayStatus(changeStatus: boolean): void {
    this.cartOverlayUpdate.next(changeStatus);
  }

  getOverlayStatus(): Observable<boolean> {
    return this.cartOverlayUpdate.asObservable();
  }

}
