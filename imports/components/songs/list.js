import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Songs } from '../../api/songs.js';

import template from './list.html';

class SongListCtrl {
  constructor ($scope, $location) {
    'ngInject';

    this.$location = $location;

    $scope.viewModel(this);

    this.helpers({
      songs () {
        return Songs.find({}, {
          sort: {
            createdAt: -1
          }
        });
      }
    });
  }

  create () {
    var id = Songs.insert({
      createdAt: new Date()
    });

    this.$location.path('/songs/' + id + '/edit');
  }
}

const name = 'songList';

export default angular.module(name, [
  angularMeteor
])
  .component(name, {
    template,
    controller: SongListCtrl,
    controllerAs: name
  })
  .config(function($stateProvider) {
    'ngInject';
    $stateProvider
      .state('songs', {
        url: '/songs',
        template: '<song-list layout="column"></song-list>',
      });
  });
