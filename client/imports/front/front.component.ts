import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';

import { FrontDialogStartComponent } from './dialog/start.component';

import template from './front.html';

@Component({
  selector: 'front',
  template: template
})

export class FrontComponent {

  constructor (private route: ActivatedRoute,
               public dialog: MdDialog) {}

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        switch (params['action']) {
          case 'reset-password':
            this.start({
              action: 'resetPassword',
              token: params['token']
            });
            break;

          default:
        }
      });

  }

  start (params = {}) {
    let dialogRef = this.dialog.open(FrontDialogStartComponent, {
      data: params
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
  }
}
