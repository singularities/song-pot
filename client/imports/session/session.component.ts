import { Component, NgZone } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { SessionService } from './session.service';

import template from './session.html';

@Component({
  selector: 'session',
  template
})

export class SessionComponent {

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
