import { Component, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SessionService } from './session.service';

import template from './sidebar.html';

@Component({
  selector: 'session-sidebar',
  template
})

export class SessionSidebarComponent {

  user;
  userSub: Subscription;

  constructor(private ngZone: NgZone,
              private session: SessionService) {}

  ngOnInit() {
    this.userSub = this.session.currentUser.subscribe((user) => {

      this.ngZone.run(() => {
        this.user = user;
      });
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  logout() {
    this.session.logout();
  }
}
