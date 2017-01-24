import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Songs } from '../../api/songs.js';

import songList from './list';

import songAdd from '../../directives/song/add';

import template from './index.html';

class SongIndexCtrl {
  constructor ($scope, $location) {
    'ngInject';
  }
}

const name = 'songIndex';

export default angular.module(name, [
  angularMeteor,
  songList.name,
  songAdd.name
])
  .component(name, {
    template,
    controller: SongIndexCtrl,
    controllerAs: name
  })
  .config(function($stateProvider) {
    'ngInject';

    $stateProvider
      .state('songs', {
        url: '/songs',
        template: '<song-index layout="column"></song-index>',
      });
  });
