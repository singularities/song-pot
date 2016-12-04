import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Audios, AudiosStore } from '../../api/audios';

import audioObject from '../../services/audio-object';

import template from './player.html';

class AudioPlayerCtrl {
  constructor ($reactive, $scope, $interval, audioObject) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$scope  = $scope;
    this.audioObject = audioObject;

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
      this.audioObject.load(this.audios[0].url);

    this.$scope.audio.play();

    this.isDisplayed = true;
  }
}

const name = "audioPlayer";

export default angular.module(name, [
  angularMeteor,
  audioObject.name
])
  .component(name, {
    template,
    controller: AudioPlayerCtrl,
    controllerAs: name,
    bindings: {
      audioIds: '<'
    }
  });
