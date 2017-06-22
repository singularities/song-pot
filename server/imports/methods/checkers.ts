import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check'

import { Bands, Songs } from '../../../imports/collections';

export var bandPermission = Match.Where(bandId => {

  // User must be logged in
  if (! Meteor.userId()) {
    throw new Meteor.Error('loggin-required',
    'You must be logged in');
  }

  check(bandId, String);

  let band = Bands.collection.findOne({ _id: bandId });

  check(band, Match.Where(b => {

    check(b, Object);

    return b.userIds.indexOf(Meteor.userId()) > -1;
  }));

  return true;
});

export var songPermission = Match.Where(songId => {

  // User must be logged in
  if (! Meteor.userId()) {
    throw new Meteor.Error('loggin-required',
    'You must be logged in');
  }

  return userOwnsSong(Meteor.userId(), songId);
});

/*
 * Check if the user can add the audio to a song
 *
 * Currently that means the user belongs to the band
 * that owns that song
 */
export function userOwnsSong(userId, songId) {

  check(userId, String);
  check(songId, String);

  let song = Songs.collection.findOne(songId);

  check(song, Object);

  let band = Bands.collection.findOne(song.bandId);

  check(band, Object);

  return band.userIds.indexOf(userId) > -1;
}
