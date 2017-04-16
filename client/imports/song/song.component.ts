import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Songs } from '../../../imports/collections';

import template from "./song.html";

@Component({
  selector: 'song',
  template,
  animations: [
    trigger('flyBottomUp', [
      state('in',
        style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style( { transform: 'translateY(100%)' } ),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translateY(100%)'}))
      ])
    ])
  ],
})

export class SongComponent implements OnInit {
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  song;

  bottomContainer;

  constructor (
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => Songs.find({ _id: params['id']}))
      .subscribe(songs => { this.song = songs[0]; });
  }

  swipe(direction) {
    if (direction === this.SWIPE_ACTION.RIGHT) {
      this.goToSong('next');
    } else {
      this.goToSong('previous');
    }
  }

  goToSong(direction) {
    let createdAtQuery = direction === 'previous' ?
      { $lt: this.song.createdAt } :
      { $gt: this.song.createdAt }

    let createdAtSort = direction === 'previous' ?
      -1 : 1

    Songs.find({
      createdAt: createdAtQuery
    }, {
      sort: {
        createdAt: createdAtSort
      },
      limit: 1
    })
    .subscribe(songs => {
      if (songs.length) {
        this.router.navigate([ '/songs', songs[0]._id]);
      }
    })

  }
}
