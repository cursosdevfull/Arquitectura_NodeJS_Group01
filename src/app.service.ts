import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsers(): any[] {
    return [
      { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jana.doe@email.com',
      },
    ];
  }
}
