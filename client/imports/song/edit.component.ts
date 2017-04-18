import { Component, Input } from '@angular/core';

import { Song } from '../../../imports/models';

import template from './edit.html';

@Component({
  selector: 'song-edit',
  template
})

export class SongEditComponent {
  @Input() song: Song;

}

/*
  confirmRemove (ev) {
    var namespace = 'song.remove.dialog.';
    var translateKeys = [ 'cancel', 'confirm', 'message' ].map((t) => {
      return namespace + t;
    });

    this.$translate(translateKeys, { 'title': this.song.title }).then((translations) => {

      var confirm = this.$mdDialog.confirm()
        .targetEvent(ev)
        .title(translations[namespace + 'message'])
        .ok(translations[namespace + 'confirm'])
        .cancel(translations[namespace + 'cancel']);

      this.$mdDialog.show(confirm).then(() => {
        Songs.remove(this.song._id);

        this.$state.go('songs');
      });
    });
  }
}
  */
