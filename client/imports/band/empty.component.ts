import { Component } from '@angular/core';

import { BandService } from './band.service';

import template from './empty.html';

@Component({
  selector: 'band-empty',
  template
})

export class BandEmptyComponent {

  constructor(private bandService: BandService) { }

  create() {
    this.bandService.create$.next();
  }
}
