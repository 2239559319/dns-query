import { createSocket, Socket, RemoteInfo } from 'dgram';
import { middlewares, add, print, parse } from './middlewares';

export class App {
  server: Socket;

  client: Socket;

  requestQueue: Array<{ msg: Buffer; rinfo: RemoteInfo }>;

  constructor() {
    this.server = createSocket('udp4');
    this.server.on('error', (err) => {
      console.error('server err', err);
    });
    this.client = createSocket('udp4');

    this.client.on('error', (err) => {
      console.log('client err', err);
    });

    this.requestQueue = [];
    this.initMiddleware();
    this.init();
  }

  initMiddleware() {
    add(print);
    add(parse);
  }

  init() {
    let middlewareFns = [];
    const { client, server } = this;
    client.on('message', (msg, rinfo) => {
      const { rinfo: clientRinfo } = this.requestQueue.shift();
      middlewareFns.forEach((fn) => {
        fn({
          msg,
          rinfo,
          type: 'res'
        });
      });
      server.send(msg, clientRinfo.port, clientRinfo.address);
    });
    server.on('message', (msg, rinfo) => {
      this.requestQueue.push({ msg, rinfo });
      middlewareFns = middlewares.map((fn) =>
        fn({
          msg,
          rinfo,
          type: 'req'
        })
      );

      client.send(msg, 53, '223.5.5.5');
    });
  }

  listen() {
    this.server.bind(
      {
        address: '127.0.0.1',
        port: 53
      },
      () => {
        console.log('dns serve in port 53');
      }
    );

    this.client.bind(
      {
        port: 5678
      },
      () => {
        console.log('client in port 5678');
      }
    );
  }
}
