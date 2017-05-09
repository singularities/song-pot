import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import { Songs, Audios } from '../../../imports/collections';
import { songPermission } from './checkers';

Meteor.methods({
  'audio.update'(id, newParams) {

    check(id, String);

    check(newParams, {
      name: Match.Maybe(String)
    });

    let audio = Audios.collection.findOne(id);

    check(audio, Object);

    check(audio.songId, songPermission);

    Audios.collection.update({ _id: id }, {
      $set: newParams
    })
  },

  'audio.remove'(id) {
    check(id, String)

    let audio = Audios.collection.findOne(id);

    check(audio, Object);

    check(audio.songId, songPermission);

    let song = Songs.collection.findOne(audio.songId);

    check(song, Object);

    let audioIds = song.audioIds;

    audioIds.splice(audioIds.indexOf(id), 1);

    Songs.collection.update({ _id: song._id }, {
      $set: {
        audioIds: audioIds
      }
    });

    Audios.collection.remove(id);
  }
});
