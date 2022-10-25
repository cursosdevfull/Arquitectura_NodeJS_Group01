import { Injectable, mixin, NestMiddleware, Type } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function RedisMiddlewareCreator(prefix: string): Type<NestMiddleware> {
  @Injectable()
  class CacheMiddleware implements NestMiddleware {
    cache = { team01_c1: ['Sergio', 'Luis', 'Juan'] };

    use(req: Request, res: Response, next: NextFunction) {
      console.log('Execution middleware');
      if (this.cache.hasOwnProperty(prefix + '_c1')) {
        next();
        //res.status(200).json(this.cache[prefix + '_c1']);
      } else {
        next();
      }
    }
  }

  return mixin(CacheMiddleware);
}
