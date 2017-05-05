import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Song } from '../../../imports/models';
import { Songs } from '../../../imports/collections';

import { BandService } from '../band/band.service';

import template from "./songs.html";

@Component({
  selector: 'songs',
  template
})

export class SongsComponent implements OnInit {

  songs: Observable<Song[]>;


  ngOnInit(): void {

    this.bandService.bandChanged$
      .subscribe(band => this.songs = Songs.find({
          _id: { '$in': band.songIds }
        }, {
          sort: {
            createdAt: -1
          }
        }).zone());
  }

  constructor (private bandService: BandService) {}
}
