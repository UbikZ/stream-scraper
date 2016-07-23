'use strict';

const prefix = 'Error';

module.exports = {
  INTERNAL: {
    code: -1,
    msg: {
      authorization: `Internal ${prefix} : Check authorization.`,
    },
  },
  NOT_FOUND_TOKEN: {
    code: -2,
    msg: {
      base: `${prefix} : Token provided is not associated with an account.`,
    },
  },
  NOT_ALLOWED: {
    code: -3,
    msg: {
      base: `${prefix} : Not Allowed.`,
      noBearer: `${prefix} : No bearer header provided.`,
    },
  },
};

