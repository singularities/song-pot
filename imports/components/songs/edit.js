import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Songs } from '../../api/songs.js';

import template from './edit.html';
import navTemplate from '../nav/songs-edit.html';

class SongEditCtrl {
  constructor ($scope, $stateParams, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({
      song () {
        return Songs.findOne({
          _id: $stateParams.id
        });
      }
    });
  }
}

export default angular.module('songEdit', [
  angularMeteor
])
  .component('songEdit', {
    template,
    controller: SongEditCtrl
  })
  .config(function($stateProvider) {
    $stateProvider.state('songEdit', {
      url: '/songs/:id/edit',
      views: {
        "": {
          template: '<song-edit></song-edit>'
        },
        "nav": {
          template: navTemplate
        }
      }
    });
  });
