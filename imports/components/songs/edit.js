import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Songs } from '../../api/songs.js';

import template from './edit.html';

class SongEditCtrl {
  constructor ($scope, $stateParams, $reactive, $state) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$state = $state;

    this.helpers({
      song () {
        return Songs.findOne({
          _id: $stateParams.id
        });
      }
    });
  }

  save () {
    Songs.update({
      _id: this.song._id
    }, {
      $set: {
        title: this.song.title,
        text: this.song.text
      }
    });

    this.$state.go('songShow', { id: this.song._id });
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
      template: '<song-edit></song-edit>'
    });
  });
