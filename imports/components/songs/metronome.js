import angular from 'angular';

import { Songs } from '../../api/songs.js';

import template from './metronome.html';

class MetronomeCtrl {
  constructor ($scope) {
    'ngInject';

    this.$scope  = $scope;

  }

  get bpm () {
    if (this.song && this.song.metronome) {
      return this.song.metronome.bpm;
    } else {
      return 100;
    }
  }
  set bpm (value) {
    // Limit value to 1 - 999
    if (value > 999) {
      value = 999;
    } else if (value < 1) {
      value = 1;
    }

    Songs.update({
      _id: this.song._id
    }, {
      $set: {
        metronome: {
          bpm: value
        }
      }
    });

    return value;
  }

  incrementBpm () {
    console.log('increment');
    this.bpm++;
  }

  decrementBpm () {
    this.bpm--;
  }
}

const name = "metronome";

export default angular.module(name, [
])
  .component(name, {
    template,
    controller: MetronomeCtrl,
    controllerAs: name,
    bindings: {
      song: '=metronomeSong'
    }
  });
