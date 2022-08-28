import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenDI {
  getMessage() {
    return 'Message from TokenDI';
  }
}
