import {BehaviorSubject} from 'rxjs';

export class Token {
  token: BehaviorSubject<string> = new BehaviorSubject<string>('');
}
