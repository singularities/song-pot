import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Songs } from '../../api/songs.js';

import template from './list.html';
songs = Songs;

class SongListCtrl {
  constructor ($scope) {
    $scope.viewModel(this);

    this.helpers({
      songs() {
        return Songs.find({}, {
          sort: {
            createdAt: -1
          }
        });
      }
    });
  }

  addSong(newSong) {
    // Insert a task into the collection
    Songs.insert({
      title: newSong,
      createdAt: new Date()
    });

    // Clear form
    this.newSong = '';
  }
}

export default angular.module('songList', [
  angularMeteor
])
  .component('songList', {
    templateUrl: 'imports/components/songs/list.html',
    controller: [ '$scope', SongListCtrl ]
  });
