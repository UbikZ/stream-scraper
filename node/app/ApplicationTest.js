'use strict';

const AbstractApplication = require('./AbstractApplication');

/**
 * Application for testing
 */
class ApplicationTest extends AbstractApplication {
  /**
   *
   * @private
   */
  checkSettings() {
    super.checkSettings();

    if (!~['staging'].indexOf(process.env.NODE_ENV)) {
      throw new Error(`[NODE_ENV] Wrong env {${process.env.NODE_ENV}} set for the application.`);
    }
  }
}

module.exports = ApplicationTest;
