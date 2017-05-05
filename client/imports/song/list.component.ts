import { Component, Input } from '@angular/core';

import { Song } from '../../../imports/models';

import template from './list.html';

@Component({
  selector: 'song-list',
  template
})

export class SongListComponent {
  @Input() songs: Song[];
}
