'use strict';

/**
 * Abstract Model
 */
class AbstractModel {
  constructor(db) {
    this.db = db;
    this.modelName = '';
    this.modelIncrName = '';
  }
}

module.exports = AbstractModel;
