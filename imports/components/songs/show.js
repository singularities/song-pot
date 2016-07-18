import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Songs } from '../../api/songs.js';

import template from './show.html';

class SongShowCtrl {
  constructor ($scope, $stateParams) {
    $scope.viewModel(this);

    this.helpers({
      songId () {
        return $stateParams.id;
      }
    });
  }
}

export default angular.module('songShow', [
  angularMeteor
])
  .component('songShow', {
    template,
    controller: SongShowCtrl
  })
  .config(function($stateProvider) {
    $stateProvider.state('songShow', {
      url: '/songs/:id',
      template: '<song-show></song-show>'
    });
  });
