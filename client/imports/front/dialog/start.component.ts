import { Component, Inject  } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import template from './start.html';

@Component({
  selector: 'front-dialog-start',
  template
})

export class FrontDialogStartComponent {

  action;
  sessionAction;

  constructor(public dialogRef: MdDialogRef<FrontDialogStartComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {}

  onActionChanged (action) {
    this.sessionAction = action;
  }
}
