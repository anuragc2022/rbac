/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import { checkPermission } from './lib/util';
import { checkJwt, checkScopes } from './lib/auth.middleware';

dotenv.config({
  path: '.env',
});

const app: Express = express();
const PORT = process.env.APP_PORT as string;

app.use(cors());
app.use(express.json());
// cb to read token and setting into res.locals
const addTokenInResLocals = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.jwtToken = req.header('Authorization')?.replace('Bearer ', '');
  next();
};

app.use(addTokenInResLocals);

// in every end point we are checking first jwt then scopes in permission then we checking inside call back having permission to see salary or not

app.post('/api/permissions', checkJwt, (req: Request, res: Response) => {
  try {
    if (res.locals.jwtToken) {
      const decodedtoken = jwt_decode(res.locals.jwtToken);
      res.status(200).json({
        status: 200,
        success: true,
        data: _.get(decodedtoken, 'permissions'),
        error: null,
      });
    }
  } catch (e: any) {
    res.status(e.status || 400).json({
      status: e.status || 400,
      success: false,
      data: null,
      error: JSON.stringify(e),
    });
  }
});

// get admin components
app.get(
  '/api/messages/admin',
  checkJwt,
  checkScopes(['read:admin']),
  (req: Request, res: Response) => {
    res.status(200).json({
      ...(checkPermission(res.locals.jwtToken, ['read:admin_component_1']) && {
        component1: {
          name: 'Matt Moris',
          email: 'matt.moris@ymail.com',
          salary: checkPermission(res.locals.jwtToken, [
            'read:display_admin_salary',
          ])
            ? '1200000.00'
            : 'XXXXXX.XX',
        },
      }),
      ...(checkPermission(res.locals.jwtToken, ['read:admin_component_2']) && {
        component2: {
          experience: '10 Years',
          designation: 'CEO',
          city: 'Ohio',
        },
      }),
    });
  }
);

// get manager components
app.get(
  '/api/messages/manager',
  checkJwt,
  checkScopes(['read:manager']),
  (req: Request, res: Response) => {
    res.status(200).json({
      ...(checkPermission(res.locals.jwtToken, [
        'read:manager_component_1',
      ]) && {
        component1: {
          name: 'Shaun Livingwood',
          email: 'shaun.livingwood@ymail.com',
          salary: checkPermission(res.locals.jwtToken, [
            'read:display_manager_salary',
          ])
            ? '900000.00'
            : 'XXXXXX.XX',
        },
      }),
      ...(checkPermission(res.locals.jwtToken, [
        'read:manager_component_2',
      ]) && {
        component2: {
          experience: '6 Years',
          designation: 'Manager',
          city: 'Boston',
        },
      }),
    });
  }
);

// get developer components
app.get(
  '/api/messages/developer',
  checkJwt,
  checkScopes(['read:developer']),
  (req: Request, res: Response) => {
    res.status(200).json({
      ...(checkPermission(res.locals.jwtToken, [
        'read:developer_component_1',
      ]) && {
        component1: {
          name: 'Joe Carter',
          email: 'joe.carter@ymail.com',
          salary: checkPermission(res.locals.jwtToken, [
            'read:display_developer_salary',
          ])
            ? '600000.00'
            : 'XXXXXX.XX',
        },
      }),
      ...(checkPermission(res.locals.jwtToken, [
        'read:developer_component_2',
      ]) && {
        component2: {
          experience: '4 Years',
          designation: 'Developer',
          city: 'Miami',
        },
      }),
    });
  }
);

app.listen(PORT, () => {
  console.log(`We LIVE at http://localhost:${PORT}`);
});
