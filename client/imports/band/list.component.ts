import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { Band } from '../../../imports/models';
import { BandService } from './band.service';

import template from './list.html';

@Component({
  selector: 'band-list',
  template
})

export class BandListComponent {

  bands: Band[];
  gridCols = 3;

  bandsChangedSub: Subscription;
  mediaSub: Subscription;

  constructor(private media: ObservableMedia,
              private bandService: BandService) {}

  ngOnInit() {
    this.bandsChangedSub = this.bandService.bandsChanged$
    .subscribe(bands => this.bands = bands);

    this.mediaSub = this.media
    .subscribe(change => {
      switch (change.mqAlias) {
      case 'xs':
        this.gridCols = 1;
        break;
      case 'sm':
        this.gridCols = 2;
        break;
      case 'md':
        this.gridCols = 3;
        break;
      case 'lg':
        this.gridCols = 4;
        break;
      default:
        this.gridCols = 5;
      }
    })
  }

  ngOnDestroy() {
    this.bandsChangedSub.unsubscribe();

    this.mediaSub.unsubscribe();
  }

}
