import type { RemoteInfo } from 'dgram';

type BaseR = {
  msg: Uint8Array;
  rinfo: RemoteInfo;
}

type Request = BaseR & { type: 'req' };
type Response = BaseR & { type: 'res' };

export type Middleware = (req: Request | null, res: Response | null) => void;

export const middlewares: Middleware[] = [];

export function add(m: Middleware) {
  middlewares.push(m);
}
