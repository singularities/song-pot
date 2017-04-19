import { Directive, HostListener, Input } from '@angular/core';

import { Song } from '../../../imports/models';
import { Songs } from '../../../imports/collections';

import { AudioUploadService } from './upload.service';

@Directive({
  selector: '[audioAdd]'
})

export class AudioAddDirective {

  @Input('audioAdd') song: Song;

  @HostListener('click') onClick() {
    this.add();
  }

  constructor(private audioUploadService: AudioUploadService) {}

  add () {
    this.audioUploadService.add(this.song);
  }
}
