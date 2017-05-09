import { MongoObservable } from 'meteor-rxjs';
import { UploadFS } from 'meteor/jalik:ufs';

import { Audio } from '../models';

export const Audios = new MongoObservable.Collection<Audio>('audios');

export const AudiosStore = new UploadFS.store.GridFS({
  collection: Audios.collection,
  name: 'audios',

  // Real permissions are defined in server/imports
  // This is a placeholder so jalik-ufs does not print
  // the annoying empty permission message on class instantation
  permissions: new UploadFS.StorePermissions({
    insert(userId, audio) {
      return false;
    },
    update(userId, audio) {
      return false;
    },
    remove(userId, doc) {
      return false;
    }
  })
});
