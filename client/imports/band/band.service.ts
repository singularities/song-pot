import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
  private bandsChangedSource: BehaviorSubject<Band[]> = new BehaviorSubject([]);
  bandChanged$: BehaviorSubject<Band> = new BehaviorSubject(undefined);
  create$ = new Subject();

  // Observable band streams
  bandsChanged$ = this.bandsChangedSource.asObservable();

  // Service message commands
  changeBands(bands: Band[]) {
    this.bandsChangedSource.next(bands);
  }
}
