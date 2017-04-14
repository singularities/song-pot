import { Component, Inject  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import template from './change-name.html';

@Component({
  selector: 'audio-dialog-change-name',
  template
})

export class AudioDialogChangeName {

  constructor(public dialogRef: MdDialogRef<AudioDialogChangeName>,
              @Inject(MD_DIALOG_DATA) public data: any) {}
}
