import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Band } from '../../../imports/models';

/*
 * Notifies other components
 * (like the parent bands component)
 * that the band has changed
 */

@Injectable()
export class BandService {

  // Observable band sources
  private bandChangedSource: BehaviorSubject<Band> = new BehaviorSubject(undefined);
  private bandsChangedSource: BehaviorSubject<Band[]> = new BehaviorSubject([]);

  // Observable band streams
  bandsChanged$ = this.bandsChangedSource.asObservable();
  bandChanged$ = this.bandChangedSource.asObservable();

  // Service message commands
  changeBands(bands: Band[]) {
    this.bandsChangedSource.next(bands);
  }
  changeBand(band: Band) {
    this.bandChangedSource.next(band);
  }
}
