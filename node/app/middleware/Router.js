'use strict';

const Log = require('./Logger').get();

const paths = require('../../config/paths');
const routes = require('../../config/routes');
const InvalidHttpMethodError = require('../errors/InvalidHttpMethodError');

const methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const controllers = ['index'];

/**
 * Router Handler Middleware
 */
class Router {
  /**
   * Generate routes for application
   * @param app
   */
  static build(app) {
    const cases = {};
    const ctrl = Router.buildControllers();
    // Switch-like
    cases[methods.POST] = app.post;
    cases[methods.PUT] = app.put;
    cases[methods.GET] = app.get;
    cases[methods.DELETE] = app.delete;

    routes.forEach(route => {
      const controller = Router.getController(route.controllerName);
      route.subRoutes.forEach(subRoute => {
        const action = Router.getAction(subRoute.actionName);
        const args = [route.pattern + subRoute.pattern];

        args.push(ctrl[route.controllerName][action]);

        Log.debug(`[ROUTES] ${subRoute.method} - ${args[0]} - ${controller}/${action}`);

        if (cases[subRoute.method]) {
          cases[subRoute.method].apply(app, args);
        } else {
          throw new InvalidHttpMethodError(subRoute.method);
        }
      });
    });
  }

  /**
   * Generate controllers object
   * @returns {{}}
   */
  static buildControllers() {
    const result = {};
    controllers.forEach((controller) => {
      result[controller] =
        require(`../${paths.folders.controllers}/${Router.getController(controller)}`);
    });

    return result;
  }

  /**
   * Parse controller
   * @param name
   * @returns {*}
   */
  static getController(name) {
    return `${name.charAt(0).toUpperCase() + name.slice(1)}Controller`;
  }

  /**
   * Parse Action
   * @param name
   * @returns {*}
   */
  static getAction(name) {
    return `${name}Action`;
  }
}

module.exports = Router;
