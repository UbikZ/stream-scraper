'use strict';

const bodyParser = require('body-parser');

/**
 * Base middleware
 */
class Base {
  /**
   * @param app
   */
  static build(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use((request, response, next) => {
      response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      response.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-tType, Authorization'
      );
      next();
    });

    // Hack to avoid muti-send issue
    app.use((request, response, next) => {
      const send = response.send;
      let sent = false;
      response.send = (data) => {
        if (sent) {
          return;
        }
        send.bind(response)(data);
        sent = true;
      };
      next();
    });
  }
}

module.exports = Base;
