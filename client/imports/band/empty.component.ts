import { Component } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import { BandService } from './band.service';

import template from './empty.html';

@Component({
  selector: 'band-empty',
  template
})

export class BandEmptyComponent {

  translateParams = {
    name: Meteor.user().profile.name
  }

  constructor(private bandService: BandService) { }

  create() {
    this.bandService.create$.next();
  }
}
