'use strict';

/**
 * Helper class
 */
class Helper {
  /**
   * @returns {number}
   */
  static isDev() {
    return ~['developement'].indexOf(process.env.NODE_ENV);
  }
}

export default Helper;
