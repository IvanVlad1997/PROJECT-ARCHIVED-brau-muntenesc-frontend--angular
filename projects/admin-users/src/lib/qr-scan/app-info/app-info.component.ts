import {Component, Input, OnInit, VERSION} from '@angular/core';

@Component({
  selector: 'lib-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss']
})
export class AppInfoComponent  {

  ngVersion = VERSION.full;

  @Input()
  hasDevices: boolean;

  @Input()
  hasPermission: boolean;

  stateToEmoji(state: boolean): string {

    const states = {
      // not checked
      undefined: '❔',
      // failed to check
      null: '⭕',
      // success
      true: '✔',
      // can't touch that
      false: '❌'
    };

    return states['' + state];
  }
}
