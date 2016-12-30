import angular from 'angular';

import audioAddProgress from '../audios/add-progress';
import audioList from '../audios/list';
import audioPlayer from '../audios/player';

import audiosBottomSheetTemplate from './audiosBottomSheet.html';

class AudiosBottomSheetCtrl {
  constructor ($scope, songAudios) {
    'ngInject';

    this.$scope  = $scope;

    this.$scope.songAudios = songAudios;
  }
}

class SongAudiosCtrl {
  constructor ($reactive, $scope, $timeout, $mdBottomSheet) {
    'ngInject';

    $reactive(this).attach($scope);

    this.$scope  = $scope;
    this.$timeout  = $timeout;
    this.$mdBottomSheet = $mdBottomSheet;

    this.addProgress = {
      percentage: 0
    };


    this.$scope.$on('$destroy', () => {
      if (this.isDisplayed) {
        this.hide();
      }
    });
  }

  show () {
    this.$mdBottomSheet.show({
      template: audiosBottomSheetTemplate,
      controller: AudiosBottomSheetCtrl,
      controllerAs: 'audiosBottomSheet',
      locals: {
        // We should not probably pass the controller like this,
        // but I cannot find the way to let reactive contexts work
        // just passing the audioIds variable
        songAudios: this
      },
      clickOutsideToClose: false,
      disableBackdrop: true,
      disableParentScroll: false
    }).finally(() => {
      this.isDisplayed = false;
    });

    this.isDisplayed = true;
  }

  hide () {
    this.$mdBottomSheet.hide();
  }

  toggle () {
    if (this.isDisplayed) {
      this.hide();
    } else {
      this.show();
    }
  }

  // There should be a better architectural way to handle this

  showProgress (options) {
    if (! this.isDisplayed) {
      this.show();
    }

    this.addProgress.name = options.name;
    this.addProgress.percentage = 0;

    this.$timeout();
  }

  hideProgress () {
    this.addProgress.name = null;

    this.$timeout();
  }

  setProgress (percentage) {
    this.addProgress.percentage = percentage;

    this.$timeout();
  }
}

const name = "songAudios";

export default angular.module(name, [
  audioList.name,
  audioAddProgress.name,
  audioPlayer.name
])
  .component(name, {
    controller: SongAudiosCtrl,
    controllerAs: name,
    bindings: {
      audioIds: '<'
    }
  });
