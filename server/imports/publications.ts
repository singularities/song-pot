import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Band } from '../../imports/models';
import { Bands, Songs } from '../../imports/collections';

Meteor.publish('bands', function(): Mongo.Cursor<Band> {
  if (! this.userId) {
    return;
  }

  return Bands.collection.find({
    userIds: this.userId
  });
});

Meteor.publish('band.songs', function(bandId) {
  return Songs.collection.find({ bandId: bandId });
})
