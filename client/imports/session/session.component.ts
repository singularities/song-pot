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

  _section;
  band;
  username;
  useremail;
  userpassword;

  @Input()
  set section(section: string) {

    this.onSectionChanged.emit(section);

    this._section = section;
  }

  get section() {
    return this._section;
  }

  @Output() onSectionChanged = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor(private snackBar: MdSnackBar,
              private ngZone: NgZone) {}

  onSubmit () {
    switch (this.section) {
    case ('register'):
      this.onRegister();
      break;
    case ('login'):
      this.onLogin();
      break;
    case ('forgotPassword'):
      this.onForgotPassword();
    }
  }

  onRegister () {

    Accounts.createUser({
      email: this.useremail,
      // Generate random password
      password: Meteor.uuid(),
      profile: {
        name: this.username
      }
    }, (error) => {
      if (error) {

        this.ngZone.run(() => {
          this.snackBar.open(error.reason, null, { duration: 5000 });
        });

      } else {
        console.log(Meteor.userId());
      }
    })

  }

  onLogin () {
    console.log(this.useremail);

  }

  onForgotPassword () {
    console.log('forgot');
  }

  switchSection () {
    switch (this.section) {
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
