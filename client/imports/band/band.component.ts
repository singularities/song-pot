import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Bands } from '../../../imports/collections';
import { Band } from '../../../imports/models';

import template from "./band.html";

@Component({
  selector: 'band',
  template
})

export class BandComponent {

  band: Band;

  constructor(private ngZone: NgZone,
              private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.params
      .filter((params: Params) => ! this.band || this.band._id !== params['id'])
      .switchMap((params: Params) => Bands.find({ _id: params['id']}))
      .subscribe(bands => {
        this.ngZone.run(() => {
          this.band = bands[0];
        });
      });
  }
}
