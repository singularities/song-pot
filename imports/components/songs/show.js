import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngFileUpload from 'ng-file-upload';
import { UploadFS } from 'meteor/jalik:ufs';

import { Songs } from '../../api/songs.js';
import { Audios, AudiosStore } from '../../api/audios';

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

  addAudio (files) {

    UploadFS.selectFile((file) => {

      var audio = {
        name: file.name,
        size: file.size,
        type: file.type,
        songId: this.song._id
      };

      var uploader = new UploadFS.Uploader({
        store: AudiosStore,
        data: file,
        file: audio,
        onError: (error) => { console.log(error); },
        onComplete: (file) => {
          console.log('completed');
        }
      });

      uploader.start();
    });
  }
}

const name = 'songShow';

export default angular.module(name, [
  angularMeteor,
  ngFileUpload
])
  .component(name, {
    template,
    controller: SongShowCtrl,
    controllerAs: name
  })
  .config(function($stateProvider) {
    $stateProvider.state(name, {
      url: '/songs/:id',
      template: '<song-show layout="column"></song-show>'
    });
  });
