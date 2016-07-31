import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';
import angularTranslate from 'angular-translate';
import angularTranslateStaticFiles from 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files';
import angularElastic from 'angular-elastic';
import uiRouter from 'angular-ui-router';

import songList from '../imports/components/songs/list';
import songShow from '../imports/components/songs/show';
import songEdit from '../imports/components/songs/edit';
import audioPlayer from '../imports/components/audios/player';

angular.module('songlog', [
  angularMeteor,
  angularMaterial,
  uiRouter,
  angularTranslate,
  angularElastic,
  songList.name,
  songShow.name,
  songEdit.name,
  audioPlayer.name
])
  .config(function($mdIconProvider) {
    'ngInject';

    const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    $mdIconProvider
      .iconSet('social',
        iconPath + 'svg-sprite-social.svg')
      .iconSet('action',
        iconPath + 'svg-sprite-action.svg')
      .iconSet('communication',
        iconPath + 'svg-sprite-communication.svg')
      .iconSet('content',
        iconPath + 'svg-sprite-content.svg')
      .iconSet('toggle',
        iconPath + 'svg-sprite-toggle.svg')
      .iconSet('navigation',
        iconPath + 'svg-sprite-navigation.svg')
      .iconSet('image',
        iconPath + 'svg-sprite-image.svg');
  })
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
