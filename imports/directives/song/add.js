import angular from 'angular';

import { Songs } from '../../api/songs.js';

class SongAddCtrl {

  constructor ($element, $location) {
    'ngInject';

    this.$location = $location;

    $element.on('click', () => {
      this.create();
    });
  }

  create () {
    var id = Songs.insert({
      createdAt: new Date()
    });

    this.$location.path('/songs/' + id + '/edit');
  }
}

const name = "songAdd";

export default angular.module(name, [
])
  .directive(name, () => {
    return {
      controller: SongAddCtrl,
      controllerAs: name,
    };
  });
