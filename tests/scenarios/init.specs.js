'use strict';

const assert = require('chai').assert;
const _ = require('lodash');

const Permission = require('./../../app/helpers/Permission');
const SuccessCode = require('./../../app/constants/SuccessCode');

const Helper = require('./../Helper');

const apiConf = require('./../../config/http').api;

/**
 * Initiate Scenario
 * @param agent
 * @param url
 */
module.exports = (agent, url) => {
  describe('> Init API', () => {
    describe(`# [GET] ${url}`, () => {
      it('returns API info', (done) => {
        agent
          .get(`${url}/`)
          .expect(200)
          .expect('Content-Type', Helper.parseContentType('application/json'))
          .then(res => {
            const result = res.body;
            assert.strictEqual(result.code, 200);
            assert.strictEqual(result.msgCode, SuccessCode.NO_CODE);
            assert.isUndefined(result.message);
            assert.strictEqual(result.data.api.pattern, apiConf.pattern);
            assert.strictEqual(result.data.api.version, apiConf.version);
            assert.isTrue(_.isEqual(result.data.permissions, Permission.generate()));
            done();
          })
          .catch(err => done(err));
      });
    });
    describe('# [GET] /', () => {
      it('should get 404 not found (not an API url)', (done) => {
        const apiUrl = '/';
        agent
          .get(apiUrl)
          .expect(404)
          .expect('Content-Type', Helper.parseContentType('text/html'))
          .then(res => {
            const result = res.text;
            assert.strictEqual(result, `Cannot GET ${apiUrl}\n`);
            done();
          })
          .catch(err => done(err));
      });
    });
  });
};
