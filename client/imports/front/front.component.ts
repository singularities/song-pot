import { Component } from '@angular/core';

import { MdDialog } from '@angular/material';

import { FrontDialogStartComponent } from './dialog/start.component';

import template from './front.html';

@Component({
  selector: 'front',
  template: template
})

export class FrontComponent {

  constructor (public dialog: MdDialog) {}

  start () {

    let dialogRef = this.dialog.open(FrontDialogStartComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
  }
}
