import { Middleware } from './middleware';

export const print: Middleware = (req, res) => {
  if (req) {
    const { rinfo } = req;
    console.log(`request from ${rinfo.address} ${rinfo.port}`);
  }
  if (res) {
    const { rinfo } = res;
    console.log(`response from ${rinfo.address} ${rinfo.port}`);
  }
};
