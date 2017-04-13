import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Songs } from '../../../imports/collections';

import template from "./song.html";

@Component({
  selector: 'song',
  template
})

export class SongComponent implements OnInit {
  song;

  constructor (
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => Songs.find({ _id: params['id']}))
      .subscribe(songs => { this.song = songs[0]; });
  }
}
