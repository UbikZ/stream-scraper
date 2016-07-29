'use strict';

const Log = require('./Logger').get();

const models = ['UserModel'];

/**
 * Model Middleware
 */
class Model {
  /**
   * Generate routes for application
   * @param app
   */
  static build(app, db) {
    app.db = {};
    models.forEach(model => {
      const ModelInstance = require(`./../models/${model}`);
      app.db[model] = new ModelInstance(db);
      Log.debug(`[MODEL] ${model} is OK`);
    });
  }
}

module.exports = Model;
