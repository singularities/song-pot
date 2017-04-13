import { Component, Input } from '@angular/core';

import { Audio } from '../../../imports/models';


import template from "./audios.html";

@Component({
  selector: 'song-audios',
  template
})

export class SongAudiosComponent {
  @Input() audioIds: string[];

  visible: boolean = true;

}
