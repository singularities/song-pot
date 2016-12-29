import angular from 'angular';

class AudioListShowCtrl {

  constructor ($element) {
    'ngInject';

    $element.on('click', () => {
      this.show();
    });
  }

  show () {
    var ctrl = angular.element('audio-list').controller('audioList');

    ctrl.show();
  }
}

const name = "audioListShow";

export default angular.module(name, [
])
  .directive(name, () => {
    return {
      controller: AudioListShowCtrl,
      controllerAs: name,
    };
  });
