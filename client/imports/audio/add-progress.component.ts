import { Component } from '@angular/core';

import { AudioUploadService } from './upload.service';

import template from './add-progress.html';

@Component({
  selector: 'audio-add-progress',
  template
})

export class AudioAddProgressComponent {

  constructor(private audioUploadService: AudioUploadService) {}

}
