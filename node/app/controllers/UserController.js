'use strict';

const AbstractController = require('./AbstractController');

const Http = require('./../helpers/Http');
const UserService = require('./../services/UserService');

const apiConf = require('./../../config/http').api;

/**
 * User controller
 */
class UserController {
  static getUsersAction(request, response) {
    // TODO
  }

  static getUserByIdAction(request, response) {
    // TODO
  }

  static getUserFavoritesAction(request, response) {
    // TODO
  }

  static getUserFriendsAction(request, response) {
    // TODO
  }
}

module.exports = UserController;
