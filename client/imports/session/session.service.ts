import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

@Injectable()
export class SessionService {

  constructor(private router: Router,
              private snackBar: MdSnackBar) {}

  currentUser = MeteorObservable.autorun()
                .map(() => Meteor.user());

  logout () {

    Meteor.logout((error) => {
      if (error) {
        this.snackBar.open(error.reason, null, { duration: 5000 });
      } else {
        this.router.navigate(['']);
      }
    })

  }

}
