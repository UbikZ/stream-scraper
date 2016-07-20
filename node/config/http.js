'use strict';

const version = 1;

const redisConf = {
  port: 6379,
  host: 'redis',
};

module.exports = {
  api: {
    version,
    pattern: `/api/v${version}`,
  },
  development: {
    port: 8080,
    redisConf,
  },
  staging: {
    port: 8081,
    redisConf,
  },
  production: {
    port: 8080,
    redisConf,
  },
};
