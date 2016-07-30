import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularTranslate from 'angular-translate';
import angularTranslateStaticFiles from 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files';
import angularElastic from 'angular-elastic';
import angularHammer from 'angular-hammer';
import uiRouter from 'angular-ui-router';

import songList from '../imports/components/songs/list';
import songShow from '../imports/components/songs/show';
import songEdit from '../imports/components/songs/edit';
import audioPlayer from '../imports/components/audios/player';

angular.module('songlog', [
  angularMeteor,
  uiRouter,
  angularTranslate,
  angularElastic,
  angularHammer,
  songList.name,
  songShow.name,
  songEdit.name,
  audioPlayer.name
])
  .config(function($locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/songs');
  })
  .config(function($translateProvider) {
    $translateProvider
      .useStaticFilesLoader({
        prefix: 'l10n/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'es'], {
        'en_*': 'en',
        'es_*': 'es'
      })
      .useSanitizeValueStrategy('escaped')
      // Do not change order of next two elements
      // https://github.com/angular-translate/angular-translate/issues/920#issuecomment-180550269
      .determinePreferredLanguage()
      .fallbackLanguage('en');
  });

function onReady () {
  angular.bootstrap(document, [ 'songlog' ]);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
