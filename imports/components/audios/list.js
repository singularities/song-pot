import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Audios, AudiosStore } from '../../api/audios';

import template from './list.html';

class AudioListCtrl {
  constructor ($reactive, $scope, $translate, $mdDialog) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$scope  = $scope;
    this.$translate = $translate;
    this.$mdDialog = $mdDialog;

    this.helpers({
      audios () {
        const ids = this.getReactively('audioIds');

        if (ids) {
          return Audios.find({
            _id: { '$in': ids }
          });
        }
      }
    });
  }

  play (audio) {
    var ctrl = angular.element('audio-player').controller('audioPlayer');

    ctrl.play(audio);
  }

  changeName (audio, ev) {
    var namespace = 'audio.rename.dialog.';
    var translateKeys = [ 'cancel', 'confirm', 'placeholder', 'title' ].map((t) => {
      return namespace + t;
    });

    this.$translate(translateKeys, { 'name': audio.name }).then((translations) => {
      var prompt = this.$mdDialog.prompt()
        .title(translations[namespace + 'title'])
        .placeholder(translations[namespace + 'placeholder'])
        .ariaLabel(translations[namespace + 'placeholder'])
        .initialValue(audio.name)
        .targetEvent(ev)
        .ok(translations[namespace + 'confirm'])
        .cancel(translations[namespace + 'cancel']);

      this.$mdDialog.show(prompt).then(function(result) {
        Audios.update(audio._id, { $set: { name: result }});
      });
    });
  }

  confirmRemove (audio, ev) {
    var namespace = 'audio.remove.dialog.';
    var translateKeys = [ 'cancel', 'confirm', 'message' ].map((t) => {
      return namespace + t;
    });

    this.$translate(translateKeys, { 'name': audio.name }).then((translations) => {

      var confirm = this.$mdDialog.confirm()
        .targetEvent(ev)
        .title(translations[namespace + 'message'])
        .ok(translations[namespace + 'confirm'])
        .cancel(translations[namespace + 'cancel']);

      this.$mdDialog.show(confirm).then(() => {
        Audios.remove(audio._id);
      });
    });
  }

}

const name = "audioList";

export default angular.module(name, [
  angularMeteor
])
  .component(name, {
    template,
    controller: AudioListCtrl,
    controllerAs: name,
    bindings: {
      audioIds: '<'
    }
  });
