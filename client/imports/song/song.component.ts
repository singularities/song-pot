import 'rxjs/add/operator/switchMap';

import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Song } from '../../../imports/models';
import { Songs } from '../../../imports/collections';

import { SongDialogConfirmRemove } from './dialog/confirm-remove.component';

import { SongService } from './song.service';
import { BandToolbarService } from '../band/toolbar.service';

import template from "./song.html";

let slideAnimationDuration = 300;

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
    ]),
    trigger('slide', [
      state('0, 1, 2',
            style({transform: 'translateX(0)'})),
      transition('1 => 2, 2 => 3, 3 => 1, :leave', [
        animate(slideAnimationDuration, style({transform: 'translateX(100%)'}))
      ]),
      transition('1 => 3, 3 => 2, 2 => 1', [
        animate(slideAnimationDuration, style({transform: 'translateX(-100%)'}))
      ]),
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate(slideAnimationDuration)
      ])
    ])
  ]
})

export class SongComponent implements OnInit {
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  song: Song;

  editing: boolean;

  // controls mobile slide animations
  slideState = 1;

  // Show components (metronome, audio list) in mobile
  bottomContainer: string;

  audiosSub: Subscription;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private dialog: MdDialog,
    private snackBar: MdSnackBar,
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
        this.updateSlideState(direction);

        // Wait until the animation has finished to change the song
        setTimeout(() => {
          this.router.navigate(['../', songs[0]._id], { relativeTo: this.route });
        }, slideAnimationDuration);
      }
    })
  }

  updateSlideState(direction) {
    let current = this.slideState;

    if (direction === 'previous') {
      current++;
    }

    this.slideState = (current % 3) + 1;
  }

  cancel () {
    // Reset song
    this.song = Songs.findOne({ _id: this.song._id });

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  save () {
    MeteorObservable.call('song.update', this.song._id, {
      title: this.song.title,
      text: this.song.text
    })
    .subscribe({
      next: (id) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (e) => {

        this.ngZone.run(() => {
          this.snackBar.open(e.reason, null, { duration: 5000 });
        });
      }
    });
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
