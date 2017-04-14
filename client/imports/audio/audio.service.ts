import { Injectable, ChangeDetectorRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Audio } from '../../../imports/models';

@Injectable()
export class AudioService {

  // The HTML5 audio object
  object;

  // Watch for song duration updates
  interval;

  loaded = new BehaviorSubject(false);

  constructor (private ref: ChangeDetectorRef) {
  }

  load (audio: Audio) {
    if (! this.object) {
      this.object = new Audio();
    }

    this.object.src = audio.url;

    this.loaded.next(true);

    this.object.onended = () => {
      this.cancelWatch();
    };

    return this;
  }

  get currentTime () {
    if (this.object.currentTime) {
      return Math.round(this.object.currentTime);
    } else {
      return 0;
    }
  }

  set currentTime (t) {
    this.object.currentTime = t;
  }

  get duration () {
    return this.object.duration;
  }

  get paused () {
    return this.object.paused;
  }

  play () {

    this.setWatch();

    this.object.play();
  }

  pause () {
    this.cancelWatch();

    this.object.pause();
  }

  stop () {
    this.pause();

    this.loaded.next(false);
  }

  loadAndPlay(audio: Audio) {

    this.load(audio);

    this.play();
  }

  setWatch () {

    this.cancelWatch();

    this.interval = setInterval(() => {
      this.ref.detectChanges();

      console.log('interval');
    }, 1000);
  }

  cancelWatch () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
