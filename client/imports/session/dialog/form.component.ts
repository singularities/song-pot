import { Component, Inject  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { MeteorObservable } from 'meteor-rxjs';

import { BandService} from '../../band/band.service';

import template from './form.html';

@Component({
  selector: 'session-dialog-form',
  template
})

export class SessionDialogFormComponent {

  action;
  sessionAction;

  constructor(private router: Router,
              public dialogRef: MdDialogRef<SessionDialogFormComponent>,
              @Inject(MD_DIALOG_DATA) public data: any,
              private bandService: BandService) {}

  onSuccess(event = {}) {
    this.dialogRef.close();

    if (event['bandId']) {
      this.router.navigate(['bands', event['bandId']]);
    } else if (this.bandService.currentBand()) {
      MeteorObservable.call('band.join', this.bandService.currentBand()._id).zone();
    }
  }

  onActionChanged (action) {
    this.sessionAction = action;
  }
}
