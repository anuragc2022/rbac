import jwtAuthz from 'express-jwt-authz';
import jwt_decode from 'jwt-decode';

// it is used to check permission to show any particular component or data
export const checkPermission = (token: any, claims: string[]) => {
  const { permissions }: any = jwt_decode(token);
  return claims.every((item) => permissions.includes(item));
};

// it is used to check scopes
const options = {
  customScopeKey: 'permissions',
  customUserKey: 'auth',
};

export const checkScopes = (scopes: string[]) => jwtAuthz(scopes, options);
