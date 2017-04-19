import { Component, OnInit, OnDestroy } from '@angular/core';

import { AudioPlayService } from './play.service';

import template from "./player.html";

@Component({
  selector: 'audio-player',
  template
})

export class AudioPlayerComponent implements OnInit, OnDestroy {

  displayed: boolean = false;

  audio;

  constructor(public audioPlayService: AudioPlayService) { }

  ngOnInit() {
    this.audioPlayService.loaded
      .subscribe(value => this.displayed = value);
  }

  ngOnDestroy() {
    this.audioPlayService.stop();
  }
}
