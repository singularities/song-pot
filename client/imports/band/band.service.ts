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
  bandsChanged$: BehaviorSubject<Band[]> = new BehaviorSubject(undefined);
  bandChanged$: BehaviorSubject<Band> = new BehaviorSubject(undefined);
  create$ = new Subject();
}
