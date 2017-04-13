import { MongoObservable } from 'meteor-rxjs';
import { UploadFS } from 'meteor/jalik:ufs';

import { Audio } from '../models';

export const Audios = new MongoObservable.Collection<Audio>('audios');

export const AudiosStore = new UploadFS.store.GridFS({
  collection: Audios.collection,
  name: 'audios'
});
