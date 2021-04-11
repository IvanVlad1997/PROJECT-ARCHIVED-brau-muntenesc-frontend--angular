import {InjectionToken} from '@angular/core';

export const USER_STORAGE: InjectionToken<Storage> = new InjectionToken('App Storage');
export const TOKEN: InjectionToken<string> = new InjectionToken('Token')
