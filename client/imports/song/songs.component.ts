import { Component, Input, NgZone} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Song, Band } from '../../../imports/models';
import { Songs } from '../../../imports/collections';

import { BandService } from '../band/band.service';

import template from "./songs.html";

@Component({
  selector: 'songs',
  template
})

export class SongsComponent {

  band: Band;

  songsSub: Subscription;
  songs: Observable<Song[]>;


  ngOnInit(): void {

    this.bandService.bandChanged$
      .subscribe(band => {

        this.ngZone.run(() => {
          this.band = band;
        });

        if (this.songsSub) {
          this.songsSub.unsubscribe();
        }

        if (this.band) {
          this.songsSub = MeteorObservable.subscribe('band.songs', this.band._id).subscribe();

          this.songs = Songs.find({
            _id: { '$in': band.songIds }
          }, {
            sort: {
              createdAt: -1
            }
          }).zone();
        }
      });
  }

  ngOnDestroy() {
    this.songsSub.unsubscribe();
  }

  constructor (private ngZone: NgZone,
               private bandService: BandService) {}
}
