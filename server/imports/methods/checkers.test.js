import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { chai } from 'meteor/practicalmeteor:chai';

import { Bands } from '../../../imports/collections';

import { bandIncludesUser } from './checkers';

var userId = '12345';
var band = {
  _id: '56789',
  name: 'Quebrantahuesos',
  userIds: [ userId, 'another_one'],
  songIds: []
};

describe('checker bandIncludesUser', function() {

  before(function () {

    Meteor.userId = () => userId;

    Bands.collection.findOne = (id) => band;
  });

  it('should validate with default data', function() {

    chai.assert.isUndefined(check(band._id, bandIncludesUser));
  });

  describe('when user is not logged in', function() {

    before(function() {
      Meteor.userId = () => null;
    });

    after(function() {
      Meteor.userId = () => userId;
    });

    it('should fail', function() {
      // Must encapsulate function call into function
      chai.assert.throws(function() { check(band._id, bandIncludesUser); },
        'loggin-required');
    });

  });

  describe('when there is no id in call', function() {

    it('should fail', function() {
      // Must encapsulate function call into function
      chai.assert.throws(function() { check(undefined, bandIncludesUser); },
        'Expected string, got undefined');
    });

  });

  describe('when there is no collection with that key', function() {

    before(function() {

      Bands.collection.findOne = (id) => null;
    });

    after(function() {
      Bands.collection.findOne = (id) => band;
    });

    it('should fail', function() {
      // Must encapsulate function call into function
      chai.assert.throws(function() { check(band._id, bandIncludesUser); },
        'Expected object, got null');
    });

  });

  describe('when user is not included', function() {

    before(function() {

      Meteor.userId = () => 'intruder';
    });

    after(function() {
      Meteor.userId = () => userId;
    });

    it('should fail', function() {
      // Must encapsulate function call into function
      chai.assert.throws(function() { check(band._id, bandIncludesUser); },
        'Match.Where validation');
    });

  });
});
