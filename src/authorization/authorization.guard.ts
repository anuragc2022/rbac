import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { promisify } from 'util';
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

@Injectable()
export class AuthorizationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);
    const checkJwt = promisify(
      jwt({
        secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri:
            'https://dev-h6cbxuxlneb4vk56.us.auth0.com/.well-known/jwks.json',
        }),
        audience: 'https://127.0.0.1:3000/admin-data-api',
        issuer: 'https://dev-h6cbxuxlneb4vk56.us.auth0.com/',
        algorithms: ['RS256'],
      }),
    );
    try {

      await checkJwt(req, res);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
