import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Songs } from '../../api/songs.js';

import template from './show.html';

class SongShowCtrl {
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

  prevSong () {
    var song = Songs.find({
        createdAt: { $lt: this.song.createdAt }
      }, {
        sort: {
          createdAt: -1
        },
        limit: 1
      }).fetch();

    if (song.length) {
      this.$state.go('songShow', { id: song[0]._id });
    }
  }

  nextSong () {
    var song = Songs.find({
        createdAt: { $gt: this.song.createdAt }
      }, {
        sort: {
          createdAt: 1
        },
        limit: 1
      }).fetch();

    if (song.length) {
      this.$state.go('songShow', { id: song[0]._id });
    }
  }
}

export default angular.module('songShow', [
  angularMeteor
])
  .component('songShow', {
    template,
    controller: SongShowCtrl,
  })
  .config(function($stateProvider) {
    $stateProvider.state('songShow', {
      url: '/songs/:id',
      template: '<song-show></song-show>'
    });
  });
