import { Component, Input, OnInit, NgZone } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MeteorObservable } from 'meteor-rxjs';

import { Audio } from '../../../imports/models';
import { Audios } from '../../../imports/collections';

import { AudioPlayService } from './play.service';

import { AudioDialogChangeName } from './dialog/change-name.component';
import { AudioDialogConfirmRemove } from './dialog/confirm-remove.component';

import template from "./list.html";

@Component({
  selector: 'audio-list',
  template
})

export class AudioListComponent implements OnInit {

  audios;

  private _audioIds = new BehaviorSubject<string[]>([]);

  @Input()
  set audioIds(value) {
    this._audioIds.next(value || []);
  }

  get audioIds() {
    return this._audioIds.getValue();
  }

  ngOnInit(): void {

    this._audioIds
        .subscribe(ids => this.audios = Audios.find({ _id: { '$in': ids } }).zone());
  }

  constructor (private ngZone: NgZone,
               public dialog: MdDialog,
               private snackBar: MdSnackBar,
               private audioPlayService: AudioPlayService) {}

  play (audio: Audio): void {

    this.audioPlayService.loadAndPlay(audio);
  }

  changeName(audio) {
    let dialogRef = this.dialog.open(AudioDialogChangeName, {
      data: {
        name: audio.name
      }
    });

    dialogRef.afterClosed().subscribe(newName => {
      if (newName) {
        MeteorObservable.call('audio.update', audio._id, {
          name: newName
        })
        .subscribe({
          error: (e) => {

            this.ngZone.run(() => {
              this.snackBar.open(e.reason, null, { duration: 5000 });
            });

          }
        });
      }
    });
  }

  confirmRemove(audio) {
    let dialogRef = this.dialog.open(AudioDialogConfirmRemove, {
      data: {
        name: audio.name
      }
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        MeteorObservable.call('audio.remove', audio._id)
        .subscribe({
          error: (e) => {

            this.ngZone.run(() => {
              this.snackBar.open(e.reason, null, { duration: 5000 });
            });

          }
        });
      }
    });
  }
}
