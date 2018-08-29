import { Accounts } from 'meteor/accounts-base';

Accounts.config({
    loginExpirationInDays: null
});

Accounts.emailTemplates.siteName = 'Song Pot';
Accounts.emailTemplates.from = 'Song Pot Admin <no-reply@songpot.rocks>';

Accounts.urls.resetPassword = function(token) {
  return Meteor.absoluteUrl('session/reset-password/' + token);
};
