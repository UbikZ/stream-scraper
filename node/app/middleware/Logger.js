'use strict';

const winston = require('winston');
const moment = require('moment');
const morgan = require('morgan');

const DateHelper = require('./../helpers/Date');

const paths = require('../../config/paths');

/**
 * Logger Handler middleware
 */
class Logger {
  /**
   * Build the logger as middleware
   * @param app
   */
  static build(app) {
    app.use(morgan('combined', {
      stream: {
        write: (message) => {
          Logger.get().info(message);
        },
      },
    }));
  }

  /**
   * Get the logger
   * @returns {*}
   */
  static get() {
    const transports = [Logger.transportFile()];
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
}

module.exports = Logger;

