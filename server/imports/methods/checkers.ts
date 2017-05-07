import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check'

import { Bands } from '../../../imports/collections';

export var bandIncludesUser = Match.Where(bandId => {

  // User must be logged in
  if (! Meteor.userId()) {
    throw new Meteor.Error('loggin-required',
    'You must be logged in to create a band');
  }

  check(bandId, String);

  let band = Bands.collection.findOne({ _id: bandId });

  check(band, Match.Where(b => {

    check(b, Object);

    return b.userIds.indexOf(Meteor.userId()) > -1;
  }));

  return true;
});
