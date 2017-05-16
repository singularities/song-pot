import { Directive, Input, HostListener } from '@angular/core';
import { MdDialog } from '@angular/material';

import { SessionDialogFormComponent } from './dialog/form.component';

@Directive({
  selector: '[sessionForm]'
})

export class SessionFormDirective {

  @Input() sessionForm : string;

  @HostListener('click') onClick() {
    this.show();
  }

  constructor(private dialog: MdDialog) {}


  show () {

    let dialogRef = this.dialog.open(SessionDialogFormComponent, {
      data: { action: this.sessionForm }
    });
  }

}
