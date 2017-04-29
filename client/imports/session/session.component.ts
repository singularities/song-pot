import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

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

  constructor(private snackBar: MdSnackBar,
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
        // TODO
        console.log(Meteor.userId());
      }
    })

  }

  onLogin () {
    // TODO redirect to first user band
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
    this.cancel();
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

  cancel () {
    this.onCancel.emit();
  }
}
