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
  songsSub: Subscription;

  constructor(private ngZone: NgZone,
              private route: ActivatedRoute,
              private bandService: BandService) {}

  ngOnInit() {

    this.route.params
      .filter((params: Params) => params['id'] && (! this.band || this.band._id !== params['id']))
      .switchMap((params: Params) => Bands.find({ _id: params['id']}))
      .subscribe(bands => {
        this.ngZone.run(() => {
          this.band = bands[0];

          if (this.songsSub) {
            this.songsSub.unsubscribe();
          }

          if (this.band) {
            this.songsSub = MeteorObservable.subscribe('band.songs', this.band._id).subscribe();
          }

          this.bandService.changeBand(this.band);
        });
      });
  }

  ngOnDestroy() {
    this.songsSub.unsubscribe();
  }
}
