'use strict';

require('winston-redis');
const winston = require('winston');
const util = require('util');

const DateHelper = require('./../helpers/Date');

const paths = require('../../config/paths');
const httpConf = require('./../../config/http');

/**
 * Logger Handler middleware
 */
class Logger {
  /**
   * Get the logger
   * @returns {*}
   */
  static get() {
    const transports = [Logger.transportRedis(httpConf[process.env.NODE_ENV].redisConf)];
    // We do not want use console log in "testing mode"
    if (!~['staging'].indexOf(process.env.NODE_ENV)) {
      transports.push(Logger.transportConsole());
    }

    const logger = new winston.Logger({ transports, exitOnError: false });

    logger.log = function log() {
      const args = arguments;
      args[1] = Logger.parse(args[1]);
      winston.Logger.prototype.log.apply(this, args);
    };

    return logger;
  }

  /**
   * Parse message to handle error for example
   * @param message
   * @returns {string}
   */
  static parse(message) {
    const result = [];
    const head = `[${DateHelper.now()}]`;

    if (message instanceof Error) {
      const errors = message ? message.stack.split('\n') : [];
      result.push(head);
      errors.forEach((error) => {
        result.push(error);
      });
    } else if (Object.prototype.toString.call(message) === '[object Object]') {
      result.push(util.inspect(message, false, null));
    } else {
      result.push(`${head} ${message}`);
    }

    return result.join('\n');
  }

  /**
   * For console log
   * @returns {exports.Console}
   */
  static transportConsole() {
    return new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    });
  }

  /**
   * For files log
   * @returns {exports.File}
   */
  static transportFile() {
    const fileName = `${process.env.NODE_ENV}.access.${DateHelper.now('YYYY-MM-DD')}.0.log`;
    return new winston.transports.File({
      level: 'info',
      filename: `${paths.logs}/${fileName}`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      colorize: false,
    });
  }

  /**
   * For Redis log
   * @param conf
   * @returns {*}
   */
  static transportRedis(conf) {
    const host = conf.host;
    const port = conf.port;
    return new winston.transports.Redis({ host, port });
  }
}

module.exports = Logger;

