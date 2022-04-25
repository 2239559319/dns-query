import { Middleware } from './middleware';

export const print: Middleware = (req) => {
  return (res) => {
    const { rinfo: reqRinfo } = req;
    const { rinfo: resRinfo } = res;

    console.log(`request from ${reqRinfo.address} ${reqRinfo.port} response from ${resRinfo.address} ${resRinfo.port}`);
  };
};
