'use strict';

const version = 1;

module.exports = {
  api: {
    version,
    pattern: `/api/v${version}`,
  },
  development: {
    port: 8080,
  },
  staging: {
    port: 8081,
  },
  production: {
    port: 8080,
  },
};
