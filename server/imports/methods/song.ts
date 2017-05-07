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
  }
});
