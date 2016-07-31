import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Songs } from '../../api/songs.js';

import template from './edit.html';

class SongEditCtrl {
  constructor ($scope, $stateParams, $reactive, $state, $mdDialog, $translate) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.$translate = $translate;

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

  confirmRemove (ev) {
    var namespace = 'song.remove.dialog.';
    var translateKeys = [ 'cancel', 'confirm', 'message' ].map((t) => {
      return namespace + t;
    });

    this.$translate(translateKeys, { 'title': this.song.title }).then((translations) => {

      var confirm = this.$mdDialog.confirm()
        .targetEvent(ev)
        .title(translations[namespace + 'message'])
        .ok(translations[namespace + 'confirm'])
        .cancel(translations[namespace + 'cancel']);

      this.$mdDialog.show(confirm).then(() => {
        Songs.remove(this.song._id);

        this.$state.go('songs');
      });
    });
  }
}

const name = 'songEdit';

export default angular.module(name, [
  angularMeteor
])
  .component(name, {
    template,
    controller: SongEditCtrl,
    controllerAs: name
  })
  .config(function($stateProvider) {
    $stateProvider.state(name, {
      url: '/songs/:id/edit',
      template: '<song-edit layout="column"></song-edit>'
    });
  });
