import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { MeteorObservable } from 'meteor-rxjs';

import { Bands } from '../../../imports/collections';

import template from './session-form.html';

@Component({
  selector: 'session-form',
  template
})

export class SessionFormComponent {

  _action;
  band;
  user = <any>{};

  @Input()
  set action(action: string) {

    this.onActionChanged.emit(action);

    this._action = action;
  }

  get action() {
    return this._action || 'register';
  }
  @Input() token;

  @Output() onActionChanged = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  ngOnInit() {
    // set parent component action to default action
    this.onActionChanged.emit(this.action);
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
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

        if (this.band && this.band.length) {

          MeteorObservable.call('band.insert', {
            name: this.band
          })
          .subscribe({
            next: (id) => {
              this.close();

              this.router.navigate(['bands', id]);
            },
            error: (e) => {

              this.ngZone.run(() => {
                this.snackBar.open(e.reason, null, { duration: 5000 });
              });

            }
          });
        } else {
          this.close();

          this.router.navigate(['bands']);
        }
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
        this.close();

        this.router.navigate(['bands']);
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
        this.close();

        this.router.navigate(['bands']);
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
