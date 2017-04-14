import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import template from './confirm-remove.html';

@Component({
  selector: 'audio-dialog-confirm-remove',
  template
})

export class AudioDialogConfirmRemove {

  constructor(public dialogRef: MdDialogRef<AudioDialogConfirmRemove>,
              @Inject(MD_DIALOG_DATA) public data: any) {}
}
