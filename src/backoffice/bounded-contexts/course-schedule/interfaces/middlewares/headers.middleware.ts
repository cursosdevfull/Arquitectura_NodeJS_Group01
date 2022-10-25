import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers['authorization'] &&
      req.headers['authorization'].startsWith('Bearer ')
    ) {
      const accessToken = req.headers['authorization'].split(' ')[1];
      res.locals.accessToken = accessToken;
      return next();
    }

    next();
  }
}
