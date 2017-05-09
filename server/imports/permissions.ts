import { check } from 'meteor/check';
import { UploadFS } from 'meteor/jalik:ufs';

import { Bands, Songs, AudiosStore } from '../../imports/collections';

/*
 * Check if the user can add the audio to a song
 *
 * Currently that means the user belongs to the band
 * that owns that song
 */
function userOwnsSong(userId, songId) {

  check(userId, String);
  check(songId, String);

  let song = Songs.collection.findOne(songId);

  check(song, Object);

  let band = Bands.collection.findOne(song.bandId);

  check(band, Object);

  return band.userIds.indexOf(userId) > -1;
}

AudiosStore.setPermissions(new UploadFS.StorePermissions({
  insert(userId, audio) {

    return userOwnsSong(userId, audio.songId);
  },
  update(userId, audio) {

    return userOwnsSong(userId, audio.songId);
  },
  remove(userId, audio) {

    return userOwnsSong(userId, audio.songId);
  }
}));
