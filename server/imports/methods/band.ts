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
  },

  'band.join'(bandId) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('loggin-required',
        'You must be logged in to join a band');
    }

    check(bandId, String);

    let band = Bands.collection.findOne(bandId);

    check(band, Object);

    let userIds = band.userIds;

    userIds.push(this.userId);

    Bands.collection.update({
      _id: bandId
    }, {
      $set: {
        userIds: userIds
      }
    })
  }
})
