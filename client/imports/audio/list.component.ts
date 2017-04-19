import { Component, Input, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

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

  @Input() audioIds: string[];

  ngOnInit(): void {

    this.audios = Audios.find({ _id: { '$in': this.audioIds || [] } });
  }

  constructor (public dialog: MdDialog,
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
        Audios.update(audio._id, { $set: { name: newName }});
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
        Audios.remove(audio._id);
      }
    });
  }
}
