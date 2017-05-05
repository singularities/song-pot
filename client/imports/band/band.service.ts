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

 // Observable string sources
  private bandChangedSource: BehaviorSubject<Band> = new BehaviorSubject(undefined);

  // Observable string streams
  bandChanged$ = this.bandChangedSource.asObservable();

  // Service message commands
  changeBand(band: Band) {
    this.bandChangedSource.next(band);
  }
}
