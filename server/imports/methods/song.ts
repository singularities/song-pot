import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

import { Bands, Songs, Audios } from '../../../imports/collections';
import { bandPermission } from './checkers';

Meteor.methods({
  'song.insert'(params) {

    check(params.bandId, bandPermission);

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
      title: Match.Maybe(String),
      text: Match.Maybe(String),
      audioIds: Match.Maybe([String]),
      'metronome.bpm': Match.Maybe(Number),
      'metronome.bpb': Match.Maybe(Number)
    });

    let song = Songs.collection.findOne({ _id: id });

    check(song, Object);

    check(song.bandId, bandPermission);

    // Check that new audio/s belong to this song
    if (newParams.audioIds) {
      newParams.audioIds
      .filter(e => song.audioIds.indexOf(e) < 0)
      .forEach(audioId => {
        let audio = Audios.collection.findOne(audioId);

        if (audio.songId !== id) {

          throw new Meteor.Error('song-id-mismatch',
          'Trying to assing an audio to a different song');
        }
      });
    }

    Songs.collection.update({ _id: id }, {
      $set: newParams
    })
  },

  'song.remove'(id) {
    check(id, String)

    let song = Songs.collection.findOne({ _id: id });

    check(song, Object);

    check(song.bandId, bandPermission);

    let band = Bands.collection.findOne(song.bandId);

    let songIds = band.songIds;

    songIds.splice(songIds.indexOf(id), 1);

    Bands.collection.update({ _id: band._id }, {
      $set: {
        songIds: songIds
      }
    });

    Audios.collection.remove({ songId: id});

    Songs.collection.remove(id);
  }
});
