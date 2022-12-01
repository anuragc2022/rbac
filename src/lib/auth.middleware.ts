import { Request, Response, NextFunction } from 'express';

const {
  auth,
  claimCheck,
  InsufficientScopeError,
} = require('express-oauth2-jwt-bearer');

export const checkJwt = auth({
  issuerBaseURL: `https://dev-h6cbxuxlneb4vk56.us.auth0.com/`,
  audience: 'https://127.0.0.1:3000/admin-data-api',
});

export const checkScopes =
  (requiredPermissions: any[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const permissionCheck = claimCheck((payload: { permissions: any[] }) => {
      const permissions = payload.permissions || [];

      const hasPermissions = requiredPermissions.every((requiredPermission) =>
        permissions.includes(requiredPermission)
      );

      if (!hasPermissions) {
        throw new InsufficientScopeError();
      }
      return hasPermissions;
    });

    permissionCheck(req, res, next);
  };
