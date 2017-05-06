import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/*
 * Allows other components to hide the band toolbar
 */

@Injectable()
export class BandToolbarService {

 // Observable string sources
  private toolbarChangedSource: BehaviorSubject<boolean> = new BehaviorSubject(true);

  // Observable string streams
  toolbarChanged$ = this.toolbarChangedSource.asObservable();

  // Service message commands
  changeToolbar(value: boolean) {
    this.toolbarChangedSource.next(value);
  }
}
