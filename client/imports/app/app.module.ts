import 'hammerjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


import { SongsPot } from './app.component';
import { Songs } from '../songs/songs.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      {
        path: 'songs',
        component: Songs
      },
      {
        path: '',
        redirectTo: '/songs',
        pathMatch: 'full'
      }
    ]),
  ],
  declarations: [
    SongsPot,
    Songs
  ],
  entryComponents: [
    SongsPot
  ],
  bootstrap: [ SongsPot ]
})

export class AppModule {}

/*
import angularTranslate from 'angular-translate';
import angularTranslateStaticFiles from 'angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files';

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


*/
