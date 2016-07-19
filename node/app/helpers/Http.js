'use strict';

const moment = require('moment');
const BPromise = require('bluebird');

const Permission = require('./Permission');
const DateHelper = require('./Date');

const Log = require('./../middleware/Logger').get();

const UndefinedTokenError = require('./../errors/UndefinedTokenError');
const NotFoundTokenError = require('./../errors/NotFoundTokenError');
const NotAllowedError = require('./../errors/NotAllowedError');

const ErrorCode = require('./../constants/ErrorCode');

/**
 * Http helper to handle requests, responses, logging etc.
 */
class Http {
  /**
   * Global method to send and log a formated/standard json object response
   * @param response
   * @param status
   * @param msgCode
   * @param message
   * @param data
   */
  static sendResponse(response, status, msgCode, message, data) {
    if (message && message instanceof Error && message.constructor) {
      message.type = message.constructor.name;
    }
    if (status !== 200) {
      Log.warning(message);
    }
    Http.response(response, status, msgCode, message, data);
  }

  /**
   * Global method to send a formated/standard json object response
   * @param response
   * @param status
   * @param msgCode
   * @param message
   * @param data
   */
  static response(response, status, msgCode, message, data) {
    data = data || {};
    const dat = {
      code: status,
      date: DateHelper.now(),
      message,
      msgCode,
      data,
    };

    response.status(status).json(dat);
  }

  /**
   * Global method to check http headers sent (or get param)
   * @param request
   * @param response
   * @param next
   */
  static ensureAuthorized(request, response, next) {
    let bearerToken;
    const bearerHeader = request.headers.authorization || request.query.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      bearerToken = bearer[1];
      request.token = bearerToken;
      next();
    } else {
      const error = new UndefinedTokenError(ErrorCode.NOT_ALLOWED.msg.noBearer);
      Http.sendResponse(response, 403, ErrorCode.NOT_ALLOWED.code, error);
    }
  }

  /**
   * Global method to check authorization to access a method
   * @param request
   * @param response
   * @param permissions
   * @returns {*}
   */
  //static checkAuthorized(request, response, permissions) {
  //  return User.findOne({ token: request.token }).populate('role').lean().execAsync()
  //    .then((user) => {
  //      if (!user) {
  //        throw new NotFoundTokenError(ErrorCode.NOT_FOUND_TOKEN.msg.base);
  //      }
  //      if (!Permission.check(user.role.permissions, permissions)) {
  //        throw new NotAllowedError(ErrorCode.NOT_ALLOWED.msg.base);
  //      }
  //
  //      return new BPromise((resolve) => {
  //        resolve(user);
  //      });
  //    })
  //    .catch(NotFoundTokenError, (error) => {
  //      Http.sendResponse(response, 404, ErrorCode.NOT_FOUND_TOKEN.code, error);
  //    })
  //    .catch(NotAllowedError, (error) => {
  //      Http.sendResponse(response, 403, ErrorCode.NOT_ALLOWED.code, error);
  //    })
  //    .catch(Error, (error) => {
  //      error.message = ErrorCode.INTERNAL.msg.authorization;
  //      Http.sendResponse(response, 500, ErrorCode.INTERNAL.code, error);
  //    });
  //}
}

module.exports = Http;
