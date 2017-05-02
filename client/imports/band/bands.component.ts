import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Band } from '../../../imports/models';
import { Bands } from '../../../imports/collections';

import template from './bands.html';

@Component({
  selector: 'bands',
  template
})

export class BandsComponent {

  bands: Observable<Band[]>;
  bandsSub: Subscription;
  currentBand: string;

  constructor() { }

  ngOnInit() {
    this.bands = Bands.find({}).zone();
    this.bandsSub = MeteorObservable.subscribe('bands').subscribe();
  }

  ngOnDestroy() {
    this.bandsSub.unsubscribe();
  }

  newBand() {
    console.log('new band');
  }

}
