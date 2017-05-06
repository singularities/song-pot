import 'rxjs/add/operator/switchMap';

import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MdDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Song } from '../../../imports/models';
import { Songs } from '../../../imports/collections';

import { SongDialogConfirmRemove } from './dialog/confirm-remove.component';

import { SongService } from './song.service';
import { BandToolbarService } from '../band/toolbar.service';

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

  song: Song;

  editing: boolean;

  // Show components (metronome, audio list) in mobile
  bottomContainer: string;

  audiosSub: Subscription;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private dialog: MdDialog,
    private songService: SongService,
    private bandToolbarService: BandToolbarService
  ) {}

  ngOnInit(): void {

    this.route.params
      .filter((params: Params) => ! this.song || this.song._id !== params['id'])
      .switchMap((params: Params) => Songs.find({ _id: params['id']}))
      .subscribe(songs => {
        this.ngZone.run(() => {
          this.song = songs[0];

          this.songService.changeSong(this.song);

          if (this.audiosSub) {
            this.audiosSub.unsubscribe();
          }

          if (this.song) {
            this.audiosSub = MeteorObservable.subscribe('song.audios', this.song.audioIds).subscribe();
          }
        })
      });

    this.route.params
      .subscribe((params: Params) => { this.editing = params['child'] === 'edit' } );

    this.bandToolbarService.changeToolbar(false);
  }

  ngOnDestroy() {
    this.audiosSub.unsubscribe();

    this.songService.changeSong(null);

    this.bandToolbarService.changeToolbar(true);
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
        this.router.navigate(['../', songs[0]._id], { relativeTo: this.route });
      }
    })
  }

  cancel () {
    // Reset song
    this.song = Songs.findOne({ _id: this.song._id });

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  save () {
    Songs.update({
      _id: this.song._id
    }, {
      $set: {
        title: this.song.title,
        text: this.song.text
      }
    });

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  confirmRemove() {
    let dialogRef = this.dialog.open(SongDialogConfirmRemove, {
      data: {
        title: this.song.title || ''
      }
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        Songs.remove(this.song._id);

        this.router.navigate(['./'], { relativeTo: this.route });
      }
    });
  }
}
