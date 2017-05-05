import { Component, Input } from '@angular/core';

import { Song } from '../../../imports/models';

import template from './edit.html';

@Component({
  selector: 'song-edit',
  template
})

export class SongEditComponent {
  @Input() song: Song;

}
