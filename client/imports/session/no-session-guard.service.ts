import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Meteor } from 'meteor/meteor';

@Injectable()
export class NoSessionGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    if (Meteor.userId()) {
      this.router.navigate(['bands']);

      return false;
    }

    return true;
  }
}
