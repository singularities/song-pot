import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularAudio from 'angular-audio';
import { Audios, AudiosStore } from '../../api/audios';

import template from './player.html';

class AudioPlayerCtrl {
  constructor ($reactive, $scope, ngAudio) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$scope  = $scope;
    this.ngAudio = ngAudio;

    this.helpers({
      first () {
        const song = this.getReactively('song');

        if (song) {
          return Audios.findOne({
            songId: song._id
          });
        }
      }
    });
  }

  play () {
    this.$scope.audio = this.ngAudio.load(this.first.url);
    this.$scope.audio.play();
  }

}

const name = "audioPlayer";

export default angular.module(name, [
  angularMeteor,
  angularAudio
])
  .component(name, {
    template,
    controller: AudioPlayerCtrl,
    controllerAs: name,
    bindings: {
      song: '<'
    }
  });
