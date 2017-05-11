import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Bands } from '../../../imports/collections';
import { Band } from '../../../imports/models';

import { BandService } from './band.service';

import template from "./band.html";

@Component({
  selector: 'band',
  template
})

export class BandComponent {

  band: Band;
  routeSub: Subscription;
  bandSub: Subscription;

  constructor(private ngZone: NgZone,
              private route: ActivatedRoute,
              private bandService: BandService) {}

  ngOnInit() {

    this.routeSub = this.route.params
    .filter((params: Params) => params['id'] && (! this.band || this.band._id !== params['id']))
    // TODO unsubscribe from meteor publication?
    .switchMap((params: Params) => MeteorObservable.subscribe('band', params['id']))
    .switchMap(() => Bands.find({ _id: this.route.params.getValue().id}))
    .subscribe(bands => {
      this.bandService.bandChanged$.next(bands[0]);
    });

    this.bandSub = this.bandService.bandChanged$.subscribe((band) => {
      this.ngZone.run(() => {
        this.band = band;
      });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();

    this.bandSub.unsubscribe();
  }
}
