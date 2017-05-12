import { Component, NgZone } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { SessionService } from './session.service';

import template from './toolbar.html';

@Component({
  selector: 'session-toolbar',
  template
})

export class SessionToolbarComponent {

  user;

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
  }

  logout () {
    this.session.logout();
  }

}
