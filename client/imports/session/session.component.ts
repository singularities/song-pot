import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Bands } from '../../../imports/collections';

import template from './session.html';

@Component({
  selector: 'session',
  template
})

export class SessionComponent {

  _action;
  band;
  user = <any>{};

  @Input()
  set action(action: string) {

    this.onActionChanged.emit(action);

    this._action = action;
  }

  get action() {
    return this._action;
  }
  @Input() token;

  @Output() onActionChanged = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor(private router: Router,
              private snackBar: MdSnackBar,
              private ngZone: NgZone) {}

  onSubmit () {
    this['on' + this.action.charAt(0).toUpperCase() + this.action.slice(1)]();
  }

  onRegister () {

    Accounts.createUser({
      email: this.user.email,
      // Generate random password
      password: Meteor['uuid'](),
      profile: {
        name: this.user.name
      }
    }, (error) => {
      if (error) {

        this.ngZone.run(() => {
          this.snackBar.open(error.reason, null, { duration: 5000 });
        });

      } else {

        Bands
          .insert({
            name: this.band,
            createdAt: new Date(),
            userIds: [ Meteor.userId() ]
          })
          .subscribe(id => {
            this.close();

            this.router.navigate(['/bands', id]);
          });
      }
    })

  }

  onLogin () {
    Meteor.loginWithPassword(this.user.email, this.user.password, (error) => {
      if (error) {

        this.ngZone.run(() => {
          this.snackBar.open(error.reason, null, { duration: 5000 });
        });
      } else {
        // TODO redirect to first user band
      }
    })
  }

  onForgotPassword () {
    Accounts.forgotPassword({
      email: this.user.email
    }, (error) => {
      if (error) {
        this.ngZone.run(() => {
          this.snackBar.open(error.reason, null, { duration: 5000 });
        });
      } else {
        this.ngZone.run(() => {
          this.action = 'sentPasswordEmail';
        });
      }
    });
  }

  onSentPasswordEmail () {
    this.close();
  }

  onResetPassword () {
    Accounts.resetPassword(this.token, this.user.password, (error) => {
      if (error) {
        this.ngZone.run(() => {
          this.snackBar.open(error.reason, null, { duration: 5000 });
        });
      } else {
        // TODO redirect to first band
      }
    })

  }

  switchAction () {
    switch (this.action) {
      case 'register':
        return 'login';
      default:
        return 'register';
    }
  }

  // Syntactic sugar
  close () {
    this.cancel();
  }

  cancel () {
    this.onCancel.emit();
  }
}
