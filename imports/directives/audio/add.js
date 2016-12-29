import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { UploadFS } from 'meteor/jalik:ufs';

import { Songs } from '../../api/songs';
import { Audios, AudiosStore } from '../../api/audios';

class AudioAddCtrl {

  constructor ($reactive, $element, $scope, $translate, $mdToast) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$translate = $translate;
    this.$mdToast   = $mdToast;
    this.$scope     = $scope;

    $element.on('click', () => {
      this.add();
    });
  }

  add () {
    var audioAddProgress = angular.element('audio-add-progress').controller('audioAddProgress');

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
          audioAddProgress.setProgress(progress * 100);
        },
        onError: (error) => {
          this.$translate('audio.add.error').then((message) => {
            this.$mdToast.show(
              this.$mdToast.simple()
                .textContent(message + error)
            );
          });
        },
        onComplete: (file) => {
          var audioIds = this.$scope.audioAdd.audioIds;

          if (! audioIds) {
            audioIds = [];
          }

          audioIds.push(file._id);

          Songs.update({
            _id: this.$scope.audioAdd._id
          }, {
            $set: {
              audioIds: audioIds
            }
          });

          audioAddProgress.hide();

          this.$translate('audio.add.success').then((message) => {
            this.$mdToast.show(
              this.$mdToast.simple()
                .textContent(message)
            );
          });
        }
      });

      audioAddProgress.show();

      uploader.start();
    });
  }
}

const name = "audioAdd";

export default angular.module(name, [
  angularMeteor
])
  .directive(name, () => {
    return {
      controller: AudioAddCtrl,
      controllerAs: name,
      scope: {
        audioAdd: '='
      }
    };
  });
