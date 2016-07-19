'use strict';

const Permission = require('./../helpers/Permission');

/**
 * Abstract Controller
 */
class AbstractController {
  /**
   * Use helper to generate default permission
   * @returns {*}
   */
  static get permissions() {
    return Permission.generate();
  }
}

module.exports = AbstractController;
