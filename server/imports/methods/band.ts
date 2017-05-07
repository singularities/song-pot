import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Bands } from '../../../imports/collections';

const nonEmptyString = Match.Where((str) => {
  check(str, String);

  return str.length > 0;
});

Meteor.methods({
  'band.insert'(params) {

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('loggin-required',
        'You must be logged in to create a band');
    }

    check(params.name, nonEmptyString);

    return Bands.collection.insert({
      name: params.name,
      createdAt: new Date(),
      userIds: [ Meteor.userId() ],
      songIds: []
    });
  }
})
