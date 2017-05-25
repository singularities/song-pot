import { Component, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import template from './start.html';

@Component({
  selector: 'front-dialog-start',
  template
})

export class FrontDialogStartComponent {

  action;
  sessionAction;

  constructor(private router: Router,
              public dialogRef: MdDialogRef<FrontDialogStartComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {}

  onSuccess(event = {}) {
    this.dialogRef.close();

    let params = ['bands'];

    if (event['bandId']) {
      params.push(event['bandId']);
    }

    this.router.navigate(params);
  }

  onActionChanged (action) {
    this.sessionAction = action;
  }
}
