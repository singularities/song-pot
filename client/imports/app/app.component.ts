import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Meteor } from 'meteor/meteor';

import { AudioPlayService } from '../audio/play.service';
import { AudioUploadService } from '../audio/upload.service';

import template from "./app.html";

@Component({
  selector: 'song-pot',
  providers: [
    AudioPlayService,
    AudioUploadService
  ],
  template
})

export class SongPot {
  constructor(private router: Router,
              translate: TranslateService,
              angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // use user's language
    translate.use(translate.getBrowserLang());
  }

  ngOnInit() {

    if (Meteor.isCordova) {
      let pathRegexp = /.+?\:\/\/.+?(\/.*)$/;

      universalLinks.subscribe(null, (event) => {

        this.router.navigateByUrl(pathRegexp.exec(event.url)[1]);
      });
    }
  }
}
