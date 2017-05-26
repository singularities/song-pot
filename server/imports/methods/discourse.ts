var discourseSSO = require('discourse-sso');

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

Meteor.methods({
  'discourse.sso'(payload, sig) {


    if (! Meteor.userId()) {
      throw new Meteor.Error('loggin-required',
        'You must be logged in sign in');
    }

    let user = Meteor.user();

    check(payload, String);
    check(sig, String);

    let sso = new discourseSSO(process.env.DISCOURSE_SSO_SECRET);

    if (! sso.validate(payload, sig)) {

      throw new Meteor.Error('parameters not valid', "Payload and Sig are not valid")
    }

    var result = {
      "nonce": sso.getNonce(payload),
      "external_id": user._id,
      "email": user.emails[0].address,
//      "username": user.profile.name.replace(/[^a-z0-9]+/gi, "_"),
      "name": user.profile.name
    }

    return {
      redirectToUri: process.env.DISCOURSE_URL +
                     '/session/sso_login?' +
                     sso.buildLoginString(result)
    }
  }
});
