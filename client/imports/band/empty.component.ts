import { Component } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { BandService } from './band.service';

import template from './empty.html';

@Component({
  selector: 'band-empty',
  template
})

export class BandEmptyComponent {

  translateParams;

  ngOnInit() {
    MeteorObservable.autorun().subscribe(() => {
      let user = Meteor.user();

      if (user) {
        this.translateParams = {
          name: user.profile.name
        }
      }
    })
  }

  constructor(private bandService: BandService) { }

  create() {
    this.bandService.create$.next();
  }
}
