import angular from 'angular';
import angularMeteor from 'angular-meteor';
import songList from '../imports/components/songs/songList';

angular.module('songlog', [
  angularMeteor,
  songList.name
]);

function onReady () {
  angular.bootstrap(document, [ 'songlog' ]);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
