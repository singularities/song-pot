import { Meteor } from 'meteor/meteor';

import '../imports/collections';
import './imports/accounts';
import './imports/methods';
import './imports/publications';
import './imports/permissions';

Meteor.startup(() => {
  // code to run on server at startup
});
