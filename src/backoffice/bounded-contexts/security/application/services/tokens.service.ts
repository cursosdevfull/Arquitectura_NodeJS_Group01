import { Injectable } from '@nestjs/common';
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../domain/aggregates/user';

@Injectable()
export class TokensServices {
  generateAccessToken(user: User) {
    const payload = {
      name: user.properties().name,
      roles: user.properties().roles.map((role) => role.name),
      iat: moment().unix(),
      exp: moment().add(5, 'minutes').unix(),
    };

    return jwt.encode(payload, process.env.SECRET_KEY);
  }

  generateRefreshToken() {
    return uuidv4();
  }

  validateAccessToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, process.env.SECRET_KEY);
        resolve(payload);
      } catch (error) {
        reject({
          code: error.message === 'Token expired' ? 403 : 401,
          message: error.message,
        });
      }
    });
  }
}
