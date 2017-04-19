import { Injectable, NgZone } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { UploadFS } from 'meteor/jalik:ufs';

import { Songs, AudiosStore } from '../../../imports/collections';
import { Song } from '../../../imports/models';

@Injectable()
export class AudioUploadService {

  uploads = [];

  constructor(private translate: TranslateService,
              private snackBar: MdSnackBar,
              private ngZone: NgZone) {}

  add (song: Song) {

    UploadFS.selectFile((file) => {

      var audio = {
        name: file.name,
        size: file.size,
        type: file.type
      };

      var uploader = new UploadFS.Uploader({
        store: AudiosStore,
        data: file,
        file: audio,
        onProgress: (file, progress) => {

          for (let upload of this.uploads) {

            // FIXME there is a collision when uploading files with the same name
            if (upload.file.name === file.name) {

              this.ngZone.run(() => {

                upload.progressPercentage = progress * 100;
              });
            }
          }

        },
        onError: (error) => {

          this.ngZone.run(() => {
            
            this.translate.get('audio.add.error', { error: error})
              .subscribe((message: string) => {
                this.snackBar.open(message, null, { duration: 5000 });
            });
          });
        },
        onComplete: (file) => {
          var audioIds = song.audioIds;

          if (! audioIds) {
            audioIds = [];
          }

          audioIds.push(file._id);

          Songs.update({
            _id: song._id
          }, {
            $set: {
              audioIds: audioIds
            }
          });

          this.ngZone.run(() => {

            this.uploads.splice(this.uploads.findIndex(upload => upload.file.name === file.name), 1);

            this.translate.get('audio.upload.success')
              .subscribe((message: string) => {
                this.snackBar.open(message, null, { duration: 2000 });
            });

          });
        }
      });

      this.ngZone.run(() => {

        this.uploads.push({
          file: file,
          progressPercentage: 0
        });
      })

      uploader.start();
    });
  }
}
