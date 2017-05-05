import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Song } from '../../../imports/models';

/*
 * Notifies other components
 * (like the parent songs component)
 * that the song has changed
 */

@Injectable()
export class SongService {

 // Observable string sources
  private songChangedSource: BehaviorSubject<Song> = new BehaviorSubject(undefined);

  // Observable string streams
  songChanged$ = this.songChangedSource.asObservable();

  // Service message commands
  changeSong(song: Song) {
    this.songChangedSource.next(song);
  }
}
