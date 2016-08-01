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
      audios () {
        const ids = this.getReactively('audioIds');

        if (ids) {
          return Audios.find({
            _id: { '$in': ids }
          });
        }
      }
    });
  }

  play () {

    this.$scope.audio =
      this.ngAudio.load(this.audios[0].url);

    this.$scope.audio.play();

    this.isDisplayed = true;
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
      audioIds: '<'
    }
  });
