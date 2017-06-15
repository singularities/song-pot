import { Component, Input, NgZone } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { MeteorObservable } from 'meteor-rxjs';

import { Songs } from '../../../imports/collections';

import template from './metronome.html';

@Component({
  selector: 'metronome',
  template
})

export class MetronomeComponent {
  @Input() song;

  beepAudio = new Audio();
  barAudio = new Audio();

  playing = false;
  beatCount = 0;

  timeoutId;

  constructor (private ngZone: NgZone,
               private snackBar: MdSnackBar) {

    this.beepAudio.src = '/ogg/beep.ogg';
    this.beepAudio.preload = 'auto';

    this.barAudio.src = '/ogg/bar.ogg';
    this.barAudio.preload = 'auto';
  }

  ngOnDestroy() {
    this.stop();
  }

  get bpm () {
    if (this.song && this.song.metronome && this.song.metronome.bpm) {
      return this.song.metronome.bpm;
    } else {
      return 100;
    }
  }

  set bpm (value) {
    // Limit value to 1 - 999
    if (value > 999) {
      value = 999;
    } else if (value < 1) {
      value = 1;
    }

    MeteorObservable.call('song.update', this.song._id, {
      'metronome.bpm': value
    })
    .subscribe({
      error: (e) => {

        this.ngZone.run(() => {
          this.snackBar.open(e.reason, null, { duration: 5000 });
        });
      }
    });
  }

  get bpb () {
    if (this.song && this.song.metronome && this.song.metronome.bpb) {
      return this.song.metronome.bpb;
    } else {
      return 4;
    }
  }

  set bpb (value) {
    // Limit value to > 1
    if (value < 1) {
      value = 1;
    }

    MeteorObservable.call('song.update', this.song._id, {
      'metronome.bpb': value
    })
    .subscribe({
      error: (e) => {

        this.ngZone.run(() => {
          this.snackBar.open(e.reason, null, { duration: 5000 });
        });
      }
    });
  }

  toggle () {
    if (this.playing) {
      this.stop();
    } else {
      this.play();
    }

    this.playing = ! this.playing;
  }

  interval () {
    return 60000 / this.bpm;
  }

  play () {
    this.timeoutId = setTimeout(() => { this.play(); }, this.interval());

    if (this.beatCount === 0) {
      this.barAudio.play();
    } else {
      this.beepAudio.play();
    }

    this.beatCount = (this.beatCount + 1) % this.bpb;
  }

  stop () {
    clearTimeout(this.timeoutId);

    this.beatCount = 0;
  }

  beatCountFull () {
    return this.beatCount === 0 ? this.bpb : this.beatCount;
  }

  progressValue () {

    if (! this.playing) {
      return 100;
    }

    if (this.beatCountFull() === 1) {
      return 100;
    } else {
      return (this.beatCountFull() - 1) * 100 / this.bpb;
    }
  }
}
