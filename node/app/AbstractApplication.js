'use strict';

const fs = require('fs');
const express = require('express');
const BPromise = require('bluebird');

const Router = require('./middleware/Router');
const Base = require('./middleware/Base');
const Logger = require('./middleware/Logger');

const httpConf = require('./../config/http');
const paths = require('./../config/paths');

const Log = Logger.get();

/**
 * AbstractApplication
 */
class AbstractApplication {
  constructor() {
    try {
      this.app = express();
      this.config = undefined;

      // Call methods
      this.checkSettings();
      this.registerConfiguration();
      this.registerHttpMiddleware();
      this.registerDatabase();
      this.registerModels();
      this.registerControllers();
    } catch (error) {
      if (Log !== undefined) {
        Log.error(error);
      } else {
        console.error(error.toString());
      }
      process.exit(0);
    }
  }

  /**
   * Run the application
   */
  run() {
    this.app.listen(this.config.port, () => {
      Log.info(`[SERVER] Dstarted on port ${this.config.port}.`);
    });
  }

  /**
   * Check settings (NODE_ENV for now)
   */
  checkSettings() {
    Log.debug(`[NODE_ENV] ${process.env.NODE_ENV}.`);

    if (process.env.NODE_ENV === undefined) {
      throw new Error('[NODE_ENV] env have to be set.');
    }
  }

  /**
   * Register configuration from "conf file"
   * @private
   */
  registerConfiguration() {
    if (httpConf !== undefined && httpConf[process.env.NODE_ENV] !== undefined) {
      this.config = httpConf[process.env.NODE_ENV];
      this.config.port = this.config.port || process.env.PORT || 3000;
      this.config.debug = !!~['production'].indexOf(process.env.NODE_ENV);
      Log.debug('[CONF] Settings OK.');
    }
  }

  /**
   * Register some middleware (custom mainly)
   * @private
   */
  registerHttpMiddleware() {
    Logger.build(this.app);
    Base.build(this.app);
  }

  /**
   * Register mongodb database
   * @private
   */
  registerDatabase() {
    // todo
  }

  /**
   * @private
   */
  registerModels() {
    // todo
  }

  /**
   * @private
   */
  registerControllers() {
    Router.build(this.app);
  }
}

module.exports = AbstractApplication;
