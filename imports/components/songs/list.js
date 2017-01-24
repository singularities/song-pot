import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Songs } from '../../api/songs.js';

import songShow from './show';

import template from './list.html';

class SongListCtrl {
  constructor ($scope) {
    'ngInject';

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
}

const name = 'songList';

export default angular.module(name, [
  angularMeteor,
  songShow.name
])
  .component(name, {
    template,
    controller: SongListCtrl,
    controllerAs: name
  });
