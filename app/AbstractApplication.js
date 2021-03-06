'use strict';

const express = require('express');
const Redis = require('ioredis');

const Router = require('./middleware/Router');
const Base = require('./middleware/Base');
const Model = require('./middleware/Model');
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
      this.config = httpConf[process.env.NODE_ENV];
      this.redis = undefined;

      // Call methods
      this.registerDatabase();
      this.checkSettings();
      this.registerConfiguration();
      this.registerHttpMiddleware();
      this.registerModels();
      this.registerControllers();
    } catch (error) {
      Log.error(error);
      process.exit(0);
    }
  }

  /**
   * Run the application
   */
  run() {
    this.app.listen(this.config.port, () => {
      Log.info(`[SERVER] Started on port ${this.config.port}.`);
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
    if (httpConf !== undefined && this.config !== undefined) {
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
    Base.build(this.app);
  }

  /**
   * Register REDIS database
   * @private
   */
  registerDatabase() {
    const redisConf = this.config.redisConf;
    this.redis = new Redis(redisConf.port, redisConf.host);
    Log.info(`[REDIS] Connexion try on '${redisConf.host}:${redisConf.port}'.`);
    this.redis.on('error', (error) => {
      Log.error(`[REDIS] Error ${error.stack}`);
    });
    this.redis.on('connect', () => {
      Log.info('[REDIS] Connection DONE');
    });
    this.redis.on('ready', () => {
      Log.info('[REDIS] Connection READY');
    });
  }

  /**
   * @private
   */
  registerModels() {
    Model.build(this.app, this.redis);
  }

  /**
   * @private
   */
  registerControllers() {
    Router.build(this.app);
  }
}

module.exports = AbstractApplication;
