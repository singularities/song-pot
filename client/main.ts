import 'zone.js';
import 'reflect-metadata';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Meteor } from 'meteor/meteor';
import { AppModule } from './imports/app/app.module';

Meteor.startup(() => {
  platformBrowserDynamic().bootstrapModule(AppModule);

  if (Meteor.isCordova) {
    universalLinks.subscribe(null, function (eventData) {
      window.location.pathname = eventData.path;
    });
  }
});
