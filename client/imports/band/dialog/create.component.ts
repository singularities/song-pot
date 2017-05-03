import { Component, Inject  } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import template from './create.html';

@Component({
  selector: 'band-dialog-create',
  template
})

export class BandDialogCreate {

  constructor(public dialogRef: MdDialogRef<BandDialogCreate>) {}
}
