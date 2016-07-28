import { Mongo } from 'meteor/mongo';
import { UploadFS } from 'meteor/jalik:ufs';

export const Audios = new Mongo.Collection('audios');

export const AudiosStore = new UploadFS.store.GridFS({
  collection: Audios,
  name: 'audios'
});
