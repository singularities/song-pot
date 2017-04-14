import { Component, OnInit, OnDestroy } from '@angular/core';

import { AudioService } from './audio.service';

import template from "./player.html";

@Component({
  selector: 'audio-player',
  template
})

export class AudioPlayerComponent implements OnInit, OnDestroy {

  displayed: boolean = false;

  audio;

  constructor(public audioService: AudioService) { }

  ngOnInit() {
    this.audioService.loaded
      .subscribe(value => this.displayed = value);
  }

  ngOnDestroy() {
    this.audioService.stop();
  }
}
