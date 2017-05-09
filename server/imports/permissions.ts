import { check } from 'meteor/check';
import { UploadFS } from 'meteor/jalik:ufs';

import { Bands, Songs, AudiosStore } from '../../imports/collections';
import { userOwnsSong } from './methods/checkers';



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
