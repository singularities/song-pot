import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';
import angularTranslate from 'angular-translate';
import angularTranslateStaticFiles from 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files';
import uiRouter from 'angular-ui-router';

import songList from '../imports/components/songs/list';

angular.module('SongsPot', [
  angularMeteor,
  angularMaterial,
  uiRouter,
  angularTranslate,
  songList.name
])
  .config(function($mdIconProvider) {
    'ngInject';

    const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    $mdIconProvider
      .iconSet('action',
        iconPath + 'svg-sprite-action.svg')
      .iconSet('content',
        iconPath + 'svg-sprite-content.svg')
      .iconSet('navigation',
        iconPath + 'svg-sprite-navigation.svg')
      .iconSet('av',
        iconPath + 'svg-sprite-av.svg');
  })
  .config(function($locationProvider, $urlRouterProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/songs');
  })
  .config(function($translateProvider) {
    'ngInject';

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
  angular.bootstrap(document, [ 'SongsPot' ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
