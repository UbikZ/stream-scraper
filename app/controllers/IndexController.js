'use strict';

const AbstractController = require('./AbstractController');

const Http = require('./../helpers/Http');
const SuccessCode = require('./../constants/SuccessCode');

const api = require('./../../config/http').api;

const Logger = require('./../middleware/Logger');
const Log = Logger.get();

/**
 * Index controller
 */
class IndexController {
  /**
   * Get information about API
   * @param   request
   * @param   response
   */
  static indexAction(request, response) {
    const data = { api, permissions: AbstractController.permissions };
    Log.info('test');
    Http.sendResponse(response, 200, SuccessCode.NO_CODE, undefined, data);
  }
}

module.exports = IndexController;
