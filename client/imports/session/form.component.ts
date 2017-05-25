import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { MeteorObservable } from 'meteor-rxjs';

import { Band } from '../../../imports/models';
import { Bands } from '../../../imports/collections';
import { BandService } from '../band/band.service';

import template from './form.html';

@Component({
  selector: 'session-form',
  template
})

export class SessionFormComponent {

  _action;
  bandName;
  user = <any>{};
  currentBand: Band;
  currentBandSuscription: Subscription;

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
  @Output() onSuccess = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  ngOnInit() {

    this.bandService.bandChanged$
    .subscribe(band => {
      this.ngZone.run(() => {

        this.currentBand = band;

        if (band) {
          this.bandName = band.name;
        }
      });
    });

    // set parent component action to default action
    this.onActionChanged.emit(this.action);
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,
              private ngZone: NgZone,
              private bandService: BandService) {}

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

        if (this.bandName &&
            this.bandName.length &&
            ( ! this.currentBand ||
              this.currentBand.name !== this.bandName)) {

          MeteorObservable.call('band.insert', {
            name: this.bandName
          })
          .subscribe({
            next: (id) => {

              this.onSuccess.emit({ bandId: id});
            },
            error: (e) => {

              this.ngZone.run(() => {
                this.snackBar.open(e.reason, null, { duration: 5000 });
              });

            }
          });
        } else {
          this.onSuccess.emit();
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
        this.onSuccess.emit();
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
    this.onCancel.emit();
  }

  onResetPassword () {
    Accounts.resetPassword(this.token, this.user.password, (error) => {
      if (error) {
        this.ngZone.run(() => {
          this.snackBar.open(error.reason, null, { duration: 5000 });
        });
      } else {
        this.onSuccess.emit();
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

  cancel() {
    this.onCancel.emit();
  }
}
