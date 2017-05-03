import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SessionService {

  constructor(private router: Router,
              private snackBar: MdSnackBar) {}

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
