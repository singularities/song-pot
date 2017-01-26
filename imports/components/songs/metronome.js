import angular from 'angular';

import { Songs } from '../../api/songs.js';

import template from './metronome.html';

class MetronomeCtrl {
  constructor ($scope, $timeout) {
    'ngInject';

    this.$scope  = $scope;
    this.$timeout = $timeout;

    this.beepAudio = new Audio();
    this.beepAudio.src = '/ogg/beep.ogg';
    this.beepAudio.preload = 'auto';

    this.barAudio = new Audio();
    this.barAudio.src = '/ogg/bar.ogg';
    this.barAudio.preload = 'auto';

    this.beatCount = 1;

    this.$scope.$on('$destroy', () => {
      this.stop();
    });
  }

  get bpm () {
    if (this.song && this.song.metronome && this.song.metronome.bpm) {
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
        'metronome.bpm': value
      }
    });

    return value;
  }

  get bpb () {
    if (this.song && this.song.metronome && this.song.metronome.bpb) {
      return this.song.metronome.bpb;
    } else {
      return 4;
    }
  }

  set bpb (value) {
    // Limit value to > 1
    if (value < 1) {
      value = 1;
    }

    Songs.update({
      _id: this.song._id
    }, {
      $set: {
        'metronome.bpb': value
      }
    });

    return value;
  }

  incrementBpm () {
    this.bpm++;
  }

  decrementBpm () {
    this.bpm--;
  }

  incrementBpb () {
    this.bpb++;
  }

  decrementBpb () {
    this.bpb--;
  }

  toggle () {
    if (this.playing) {
      this.stop();
    } else {
      this.play();
    }

    this.playing = ! this.playing;
  }

  interval () {
    return 60000 / this.bpm;
  }

  play () {
    this.timeoutId = this.$timeout(() => { this.play(); }, this.interval());


    if (this.beatCount == 1) {
      this.barAudio.play();
    } else {
      this.beepAudio.play();
    }

    this.beatCount = (this.beatCount + 1) % this.bpb;
  }

  stop () {
    this.$timeout.cancel(this.timeoutId);

    this.beatCount = 1;
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
