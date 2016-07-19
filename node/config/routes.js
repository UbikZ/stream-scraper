'use strict';

const apiConf = require('./http').api;

module.exports = [
  {
    name: 'API',
    pattern: `${apiConf.pattern}/`,
    controllerName: 'index',
    subRoutes: [
      {
        name: 'Get information about the API',
        method: 'GET',
        pattern: '/',
        actionName: 'index',
        checkSecurity: false,
      },
    ],
  },
  {
    name: 'Users',
    pattern: `${apiConf.pattern}/users`,
    controllerName: 'user',
    subRoutes: [
      {
        name: 'Get users (by criteria)',
        method: 'GET',
        pattern: '/',
        actionName: 'getUsers',
        checkSecurity: true,
      },
      {
        name: 'Get ONE user',
        method: 'GET',
        pattern: '/:id',
        actionName: 'getUserById',
        checkSecurity: true,
      },
      {
        name: 'Get favorites of ONE user',
        method: 'GET',
        pattern: '/:id/favorites',
        actionName: 'getUserFavorites',
        checkSecurity: true,
      },
      {
        name: 'Get friends of ONE user',
        method: 'GET',
        pattern: '/:id/friends',
        actionName: 'getUserFriends',
        checkSecurity: true,
      },
      {
        name: 'Get friends of ONE user',
        method: 'GET',
        pattern: '/:id/friends',
        actionName: 'getUserFriends',
        checkSecurity: true,
      },

    ],
  },
];

