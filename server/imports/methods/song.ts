import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

import { Bands, Songs } from '../../../imports/collections';
import { bandIncludesUser } from './checkers';

Meteor.methods({
  'song.insert'(params) {

    check(params.bandId, bandIncludesUser);

    let band = Bands.collection.findOne({ _id: params.bandId });

    let songId = Songs.collection.insert({
      bandId: params.bandId,
      audioIds: [],
      createdAt: new Date()
    });

    band.songIds.push(songId);

    Bands.collection.update({
      _id: band._id
    },{
      $set: {
        songIds: band.songIds
      }
    });

    return songId;
  },

  'song.update'(id, newParams) {

    check(id, String);

    check(newParams, {
      title: String,
      text: String
    });

    let song = Songs.collection.findOne({ _id: id });

    check(song, Object);

    check(song.bandId, bandIncludesUser);

    Songs.collection.update({ _id: id }, {
      $set: newParams
    })
  },

  'song.remove'(id) {
    check(id, String)

    let song = Songs.collection.findOne({ _id: id });

    check(song, Object);

    check(song.bandId, bandIncludesUser);

    Songs.collection.remove(id);
  }
});
