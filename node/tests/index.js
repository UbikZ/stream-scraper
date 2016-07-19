'use strict';

const should = require('chai').should();
const request = require('supertest-as-promised');

const ApplicationClass = require('./../app/ApplicationTest');
const apiConf = require('./../config/http').api;

const application = new ApplicationClass();
application.run();


/**
 * Function which drop database to prepare  tests
 * @param done
 */
function dropDatabase(done) {
  application.mongoose.connection.db.dropDatabase(err => {
    if (err) {
      throw err;
    }
    if (typeof done === 'function') {
      done();
    }
  });
}
dropDatabase();

describe('> Application', () => {
  const agent = request.agent(application.app);

  it('# should exist', (done) => {
    should.exist(application.app);
    done();
  });

  ['init'].forEach((spec) => {
    require(`./scenarios/${spec}.specs`)(agent, apiConf.pattern);
  });

  after('# should drop database', (done) => {
    dropDatabase(done);
  });
});