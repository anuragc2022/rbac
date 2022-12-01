const { expressjwt: jwt } = require("express-jwt");
const jwks = require('jwks-rsa');
//we are checking  token is valid or invalid
export  const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-h6cbxuxlneb4vk56.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://127.0.0.1:3000/admin-data-api',
  issuer:  'https://dev-h6cbxuxlneb4vk56.us.auth0.com/',
  algorithms: ['RS256']
  });