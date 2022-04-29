import EE from 'events';
import type { Middleware } from './middleware';

export const requestEvent = new EE();
export const responseEvent = new EE();

export const serverEvent: Middleware = (req) => {
  requestEvent.emit('request', req);
  return (res) => {
    responseEvent.emit('response', req, res);
  };
};
