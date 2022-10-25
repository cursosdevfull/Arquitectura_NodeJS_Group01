import { HeadersMiddleware } from './headers.middleware';

describe('HeadersMiddleware', () => {
  it('should be defined', () => {
    expect(new HeadersMiddleware()).toBeDefined();
  });
});
