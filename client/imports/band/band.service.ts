import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Band } from '../../../imports/models';

/*
 * Notifies other components
 * (like the parent bands component)
 * that the band has changed
 */

@Injectable()
export class BandService {

 // Observable string sources
  private bandChangedSource: Subject<Band> = new Subject();

  // Observable string streams
  bandChanged$ = this.bandChangedSource.asObservable();

  // Service message commands
  changeBand(band: Band) {
    this.bandChangedSource.next(band);
  }
}
