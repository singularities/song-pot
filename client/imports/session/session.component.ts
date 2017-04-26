import { Component, Input, Output, EventEmitter } from '@angular/core';

import template from './session.html';

@Component({
  selector: 'session',
  template
})

export class SessionComponent {

  @Input('section') section: string;

  @Output() onCancel = new EventEmitter();

  constructor() { }

  cancel () {
    this.onCancel.emit();
  }
}
