'use strict';

const AbstractApplication = require('./AbstractApplication');

/**
 * Application
 */
class Application extends AbstractApplication {
  /**
   *
   * @private
   */
  checkSettings() {
    super.checkSettings();

    if (!~['production', 'development'].indexOf(process.env.NODE_ENV)) {
      throw new Error(`[NODE_ENV] Wrong env {${process.env.NODE_ENV}} set for the application.`);
    }
  }
}

module.exports = Application;
