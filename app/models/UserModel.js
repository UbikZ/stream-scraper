'use strict';

const AbstractModel = require('./AbstractModel');

/**
 * Abstract Controller
 */
class UserModel extends AbstractModel {
  constructor(db) {
    super(db);
    this.modelName = 'user';
    this.modelIncrName = 'incr_user';
  }

  add() {
    return this.db.incr(this.modelIncrName);
  }
}

module.exports = UserModel;
