'use strict';

const moment = require('moment');

/**
 * Date Helper
 */
class Date {
  /**
   * Format Date now
   * @param format
   * @returns {*}
   */
  static now(format) {
    format = format || 'YYYY-MM-DD HH:mm:SS';
    return moment().format(format);
  }
}

module.exports = Date;
