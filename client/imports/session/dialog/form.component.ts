import { Component, Inject  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import template from './form.html';

@Component({
  selector: 'session-dialog-form',
  template
})

export class SessionDialogFormComponent {

  action;
  sessionAction;

  constructor(public dialogRef: MdDialogRef<SessionDialogFormComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {}

  onActionChanged (action) {
    this.sessionAction = action;
  }
}
