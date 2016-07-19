'use strict';

const _ = require('lodash');

const permissions = ['user', 'role', 'resourceType', 'resourceProvider', 'resourceItem'];
const rules = ['create', 'read', 'update', 'delete'];

const defaultEnabled = {
  permissions: ['user', 'resourceItem'],
  rules: ['read'],
};

/**
 * Permission helper
 */
class Permission {

  /**
   * Check permission equality
   * @param currentPermission
   * @param comparePermission
   * @returns {boolean}
   */
  static check(currentPermission, comparePermission) {
    // TODO : to implement
    return true;
  }

  /**
   * Generate default permission based on "defaultEnabled" variable
   */
  static generate() {
    const element = {};

    permissions.forEach((permission) => {
      element[permission] = {};
      rules.forEach((rule) => {
        element[permission][rule] = !!(
          ~defaultEnabled.permissions.indexOf(permission) && ~defaultEnabled.rules.indexOf(rule)
        );
      });
    });

    return element;
  }

  /**
   * Return rules list
   * @returns {string[]}
   */
  static get rules() {
    return rules;
  }

  /**
   * Return permissions list
   * @returns {string[]}
   */
  static get permissions() {
    return permissions;
  }
}

module.exports = Permission;
