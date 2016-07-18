import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import songList from '../imports/components/songs/list';
import songShow from '../imports/components/songs/show';

angular.module('songlog', [
  angularMeteor,
  uiRouter,
  songList.name,
  songShow.name
])
  .config(function($locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/songs');
  });

function onReady () {
  angular.bootstrap(document, [ 'songlog' ]);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
