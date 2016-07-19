'use strict';

const should = require('chai').should();
const request = require('supertest-as-promised');

const ApplicationClass = require('./../app/ApplicationTest');
const apiConf = require('./../config/http').api;

const application = new ApplicationClass();
application.run();

describe('> Application', () => {
  const agent = request.agent(application.app);

  it('# should exist', (done) => {
    should.exist(application.app);
    done();
  });

  ['init'].forEach((spec) => {
    require(`./scenarios/${spec}.specs`)(agent, apiConf.pattern);
  });
});