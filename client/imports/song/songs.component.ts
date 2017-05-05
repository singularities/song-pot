import { Component, Input, NgZone} from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
  songs: Observable<Song[]>;


  ngOnInit(): void {

    this.bandService.bandChanged$
      .subscribe(band => {

        this.ngZone.run(() => {
          this.band = band;
        });

        this.songs = Songs.find({
          _id: { '$in': band.songIds }
        }, {
          sort: {
            createdAt: -1
          }
        }).zone();
      });
  }

  constructor (private ngZone: NgZone,
               private bandService: BandService) {}
}
