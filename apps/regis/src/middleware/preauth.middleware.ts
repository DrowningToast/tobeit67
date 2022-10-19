import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import firebase, { auth } from 'firebase-admin';
import { App, AppOptions } from 'firebase-admin/app';
import { prismaClient } from '../main';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private defaultApp: App;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      projectId: process.env.project_id,
      type: process.env.type,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key,
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
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
