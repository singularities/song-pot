import { Injectable, NgZone } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MeteorObservable } from 'meteor-rxjs';
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
        type: file.type,
        songId: song._id
      };

      var uploader = new UploadFS.Uploader({
        store: AudiosStore,
        data: file,
        file: audio,
        onProgress: (file, progress) => {

          let upload = this.findUpload(file);

          if (upload) {

            this.ngZone.run(() => {

              upload.progressPercentage = progress * 100;
              upload.roundedProgressPercentage = Math.round(upload.progressPercentage);
            });
          }

        },
        onError: (error) => {

          this.ngZone.run(() => {

            this.translate.get('audio.upload.error', { error: error })
              .subscribe((message: string) => {
                this.snackBar.open(message, null, { duration: 5000 });
            });
          });
        },
        onComplete: (file) => {
          var audioIds = song.audioIds;

          audioIds.push(file._id);

          MeteorObservable.call('song.update', song._id, {
            audioIds: audioIds
          })
          .subscribe({
            next: (id) => {

              this.ngZone.run(() => {

                // Remove file from upload list
                this.removeUpload(file);

                this.translate.get('audio.upload.success')
                  .subscribe((message: string) => {
                    this.snackBar.open(message, null, { duration: 2000 });
                });

              });
            },
            error: (e) => {

              this.ngZone.run(() => {
                this.snackBar.open(e.reason, null, { duration: 5000 });
              });
            }
          });
        }
      });

      this.ngZone.run(() => {

        this.uploads.push({
          uploader: uploader,
          name: file.name,
          progressPercentage: 0
        });
      })

      uploader.start();
    });
  }

  cancel(upload) {

    this.ngZone.run(() => {

      this.removeUpload(upload.uploader.getFile());

      upload.uploader.abort();

      this.translate.get('audio.upload.cancelled')
      .subscribe((message: string) => {
        this.snackBar.open(message, null, { duration: 2000 });
      });
    });
  }

  private findUpload (file) {

    return this.uploads.find((upload) => upload.uploader.getFile()._id === file._id);
  }

  private removeUpload (file) {

    let index = this.uploads.findIndex((upload) => upload.uploader.getFile()._id === file._id);

    this.uploads.splice(index);
  }
}
