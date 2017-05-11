import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Audio, Band, Song } from '../../imports/models';
import { Audios, Bands, Songs } from '../../imports/collections';

Meteor.publish('bands', function(): Mongo.Cursor<Band> {
  if (! this.userId) {
    return;
  }

  return Bands.collection.find({
    userIds: this.userId
  });
});

// Direct access to a band
Meteor.publish('band', function(bandId): Mongo.Cursor<Band> {
  return Bands.collection.find({
    _id: bandId
  });
});

Meteor.publish('band.songs', function(bandId: string): Mongo.Cursor<Song> {
  return Songs.collection.find({ bandId: bandId });
})

Meteor.publish('song.audios', function(ids: string[]): Mongo.Cursor<Audio> {
  return Audios.collection.find({ _id: { $in: ids } });
})
