import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Meteor } from 'meteor/meteor';

import template from './authorize.html';

@Component({
  selector: 'oauth2-authorize',
  template
})

export class OAuth2AuthorizeComponent {
  step: string;

  constructor(private ngZone: NgZone,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.step = Meteor.userId() ? 'authCodeGrant' : 'login';

    if (Meteor.userId()) {
      this.allow();
    }
  }

  allow() {
    let currentRoute = this.route.snapshot;

    oAuth2Server.callMethod.authCodeGrant(
      currentRoute.queryParams['client_id'],
      currentRoute.queryParams['redirect_uri'],
      currentRoute.queryParams['response_type'],
      undefined,
      undefined,
      (error, result) => {

        if (error) {

          this.ngZone.run(() => {
            this.snackBar.open(error.reason, null, { duration: 5000 });
          });
        } else {

          this.ngZone.run(() => {
            this.step = 'redirect';
          });

          window.location.href = result.redirectToUri
        }
      }
    );
  }
}
