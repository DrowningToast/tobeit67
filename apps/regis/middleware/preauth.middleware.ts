import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import firebase, { auth } from 'firebase-admin';
import { App, AppOptions } from 'firebase-admin/app';
import { prismaClient } from 'src/main';

import serviceAccount from '../../../firebase-service.json';

console.log(serviceAccount);

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private defaultApp: App;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      ...serviceAccount,
    } as AppOptions);
  }

  async use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;

    if (token != null && token != '') {
      try {
        const decodedIdToken = await firebase
          .auth()
          .verifyIdToken(token.replace('Bearer ', ''));
        req['current'] = decodedIdToken;
        next();
      } catch (e) {
        console.error(e);
        this.accessDenied;
      }
    } else {
      next();
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      status: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Error while validating token!',
    });
  }
}
