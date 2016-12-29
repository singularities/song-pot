import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Audios, AudiosStore } from '../../api/audios';

import template from './list.html';

class AudioListCtrl {
  constructor ($reactive, $scope) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$scope  = $scope;

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

  play (audio) {
    var ctrl = angular.element('audio-player').controller('audioPlayer');

    ctrl.play(audio);
  }
}

const name = "audioList";

export default angular.module(name, [
  angularMeteor
])
  .component(name, {
    template,
    controller: AudioListCtrl,
    controllerAs: name,
    bindings: {
      audioIds: '<'
    }
  });
