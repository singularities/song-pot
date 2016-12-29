import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './add-progress.html';

class AudioAddProgressCtrl {
  constructor ($timeout) {
    'ngInject';

    this.$timeout = $timeout;

    this.progress = 0;
    this.isDisplayed = false;
  }

  setProgress (progress) {
    this.progress = progress;

    this.$timeout();
  }

  show () {
    this.isDisplayed = true;

    this.$timeout();
  }

  hide () {
    this.isDisplayed = false;

    this.$timeout();
  }
}

const name = "audioAddProgress";

export default angular.module(name, [
  angularMeteor
])
  .component(name, {
    template,
    controller: AudioAddProgressCtrl,
    controllerAs: name
  });
