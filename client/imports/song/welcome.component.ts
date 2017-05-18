import { Component, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

import { Band } from '../../../imports/models';
import { BandService } from '../band/band.service';

import template from './welcome.html';

@Component({
  selector: 'song-welcome',
  template
})

export class SongWelcomeComponent {

  band: Band;
  bandSubscription: Subscription;

  message;

  constructor(private ngZone: NgZone,
              private translate: TranslateService,
              private bandService: BandService) { }

  ngOnInit() {
    this.bandSubscription = this.bandService.bandChanged$
    .subscribe((band) => {
      if (band) {

        this.ngZone.run(() => this.band = band);

        this.translate.get('band.welcome.message', { band: band.name })
        .subscribe((message) => this.ngZone.run(() => this.message = message));
      }
    });
  }

  ngOnDestroy() {
    this.bandSubscription.unsubscribe();
  }
}
