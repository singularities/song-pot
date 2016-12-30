import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './add-progress.html';

class AudioAddProgressCtrl {
}

const name = "audioAddProgress";

export default angular.module(name, [
  angularMeteor
])
  .component(name, {
    template,
    controller: AudioAddProgressCtrl,
    controllerAs: name,
    bindings: {
      status: '<'
    }
  });
