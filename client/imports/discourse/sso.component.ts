import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import template from './sso.html';

@Component({
  selector: 'discourse-sso',
  template
})

export class DiscourseSSOComponent {
  step: string;

  constructor(private ngZone: NgZone,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.step = Meteor.userId() ? 'authorize' : 'login';

    if (Meteor.userId()) {
      this.allow();
    }
  }

  allow() {
    let currentRoute = this.route.snapshot;

		MeteorObservable.call("discourse.sso",
                          currentRoute.queryParams['sso'],
                          currentRoute.queryParams['sig']).
    subscribe((result) => {

      this.ngZone.run(() => {
        this.step = 'redirect';
      });

      if (Meteor.isCordova) {
        window.open(result['redirectToUri'], "_blank");

        this.router.navigate(['/']);
      } else {
        window.location.href = result['redirectToUri'];
      }

    }, (error) => {

      this.ngZone.run(() => {
        this.snackBar.open(error.reason, null, { duration: 5000 });
      });
    });

  }

  onCancel() {

    window.history.back;
  }
}
