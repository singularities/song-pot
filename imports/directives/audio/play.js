import angular from 'angular';

class AudioPlayCtrl {

  constructor ($element) {
    'ngInject';

    $element.on('click', () => {
      this.play();
    });
  }

  play () {
    var ctrl = angular.element('audio-player').controller('audioPlayer');
    ctrl.play();
  }
}

const name = "audioPlay";

export default angular.module(name, [
])
  .directive(name, () => {
    return {
      controller: AudioPlayCtrl,
      controllerAs: name,
    };
  });
