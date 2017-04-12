import 'hammerjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SongsPot } from './app.component';

const ROUTES = [
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(ROUTES),
  ],
  declarations: [
    SongsPot,
  ],
  entryComponents: [
    SongsPot
  ],
  bootstrap: [ SongsPot ]
})

export class AppModule {}

/*
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMaterial from 'angular-material';
import angularTranslate from 'angular-translate';
import angularTranslateStaticFiles from 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files';
import uiRouter from 'angular-ui-router';

import songIndex from '../imports/components/songs/index';

angular.module('SongsPot', [
  angularMeteor,
  angularMaterial,
  uiRouter,
  angularTranslate,
  songIndex.name
])
  .config(function($mdThemingProvider) {
    'ngInject';

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('orange');

    $mdThemingProvider.enableBrowserColor();
  })
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
        iconPath + 'svg-sprite-av.svg')
      .iconSet('editor',
        iconPath + 'svg-sprite-editor.svg');
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
*/
