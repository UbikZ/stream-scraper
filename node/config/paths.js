'use strict';

const basePath = '..';

const controllers = 'controllers';
const models = 'models';
const app = 'app';
const errors = 'errors';
const middleware = 'middleware';
const logs = 'logs';

module.exports = {
  root: `${basePath}`,
  folders: {
    app,
    controllers,
    models,
    errors,
    middleware,
    logs,
  },
  controllers: `${app}/${controllers}`,
  models: `${app}/${models}`,
  logs: `${app}/${logs}`,
};
