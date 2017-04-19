import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import template from './confirm-remove.html';

@Component({
  selector: 'song-dialog-confirm-remove',
  template
})

export class SongDialogConfirmRemove {

  constructor(public dialogRef: MdDialogRef<SongDialogConfirmRemove>,
              @Inject(MD_DIALOG_DATA) public data: any) {}
}
