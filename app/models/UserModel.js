'use strict';

const AbstractModel = require('./AbstractModel');

const Log = require('./../middleware/Logger').get();

/**
 * User Model
 */
class UserModel extends AbstractModel {
  /**
   *
   * @param db
   */
  constructor(db) {
    super(db);
    this.modelName = 'user';
    this.modelIncrName = 'incr_user';
    this.schema = ['username', 'password'];
  }

  /**
   * Parse data to handle user creation
   * @param userData
   * @returns {Object}
   */
  parseUser(userData) {
    const user = {};

    if (Object.prototype.toString.call(userData) === '[object Object]') {
      this.schema.forEach((attr) => {
        if (userData && userData.hasOwnProperty(attr)) {
          user[attr] = userData[attr];
        }
      });
    } else {
      Log.debug('Warning : userData is not an object.');
    }

    return user;
  }

  /**
   * Create user
   * @param user
   */
  create(user) {
    const db = this.db;
    return db
      .get(this.modelIncrName)
      .then((newId) =>
        db.multi()
          .incr(this.modelIncrName)
          .hmset(`${this.modelName}:${newId}`, this.parseUser(user))
          .exec()
      );
  }
}

module.exports = UserModel;
