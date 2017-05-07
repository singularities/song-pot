import { chai } from 'meteor/practicalmeteor:chai';

import { Songs } from '../../../imports/collections';

import './song';

Songs.collection.insert = () => true;

describe('band.insert', function() {

  it('should pass', function() {
    //TOOD

    chai.assert(Songs.collection.insert(), 'inserts song successfully');
  });
});
