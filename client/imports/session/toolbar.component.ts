import { Component, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { SessionService } from './session.service';

import template from './toolbar.html';

@Component({
  selector: 'session-toolbar',
  template
})

export class SessionToolbarComponent {

  user;
  userSub: Subscription;

  constructor(private ngZone: NgZone,
              private session: SessionService) {}

  ngOnInit() {

    MeteorObservable.autorun().subscribe(() =>{

      let user = Meteor.user();

      if (this.user !== user) {

        this.ngZone.run(() => {
          this.user = user
        });
      }
    });

      /*

      // FIXME user is not available just after register
    this.userSub = this.session.currentUser.subscribe((user) => {
      this.ngZone.run(() => {
        this.user = user
      });
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    */
  }


  logout () {
    this.session.logout();
  }

}
