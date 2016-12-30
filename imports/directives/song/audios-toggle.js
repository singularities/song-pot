import angular from 'angular';

class SongAudiosToggleCtrl {

  constructor ($element) {
    'ngInject';

    $element.on('click', () => {
      this.toggle();
    });
  }

  toggle () {
    var ctrl = angular.element('song-audios').controller('songAudios');

    ctrl.toggle();
  }
}

const name = "songAudiosToggle";

export default angular.module(name, [
])
  .directive(name, () => {
    return {
      controller: SongAudiosToggleCtrl,
      controllerAs: name,
    };
  });
