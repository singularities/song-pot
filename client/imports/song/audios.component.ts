import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Audio } from '../../../imports/models';


import template from "./audios.html";

@Component({
  selector: 'song-audios',
  template
})

export class SongAudiosComponent {
  @Input() audioIds: string[];
  @Output() onClose = new EventEmitter();

  close () {
    this.onClose.emit();
  }

}
