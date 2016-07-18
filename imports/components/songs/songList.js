import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './songList.html';

class SongListCtrl {
  constructor () {
    this.songs = [
      {
        title: 'Muestras de cariño',
        text: 'Bla bla bla'
      },
      {
        title: 'Olvido',
        text: 'Te escurres...'
      }
    ];
  }
}

export default angular.module('songList', [
  angularMeteor
])
  .component('songList', {
    templateUrl: 'imports/components/songs/songList.html',
    controller: SongListCtrl
  });
