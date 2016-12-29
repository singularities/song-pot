import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularHammer from 'angular-hammer';

import { Songs } from '../../api/songs.js';

import songEdit from './edit';
import audioPlayer from '../audios/player';
import audioAddProgress from '../audios/add-progress';

import audioAdd from '../../directives/audio/add';
import audioPlay from '../../directives/audio/play';

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

const name = 'songShow';

export default angular.module(name, [
  angularMeteor,
  angularHammer,
  songEdit.name,
  audioPlayer.name,
  audioAddProgress.name,
  audioAdd.name,
  audioPlay.name
])
  .component(name, {
    template,
    controller: SongShowCtrl,
    controllerAs: name
  })
  .config(function($stateProvider) {
    'ngInject';

    $stateProvider.state(name, {
      url: '/songs/:id',
      template: '<song-show layout="column"></song-show>'
    });
  });
