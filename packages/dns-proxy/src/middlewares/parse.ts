/* eslint-disable no-unused-vars */
import { Middleware } from './middleware';
import { Request } from '../dns/request';

export const parse: Middleware = (req) => {
  return (res) => {
    const { msg: reqMsg } = req;
    const reqObj = new Request(reqMsg);
    console.log(reqObj.queryName);
  };
};
