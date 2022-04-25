import { createSocket, Socket, RemoteInfo } from 'dgram';
import { middlewares, add } from './middlewares/middleware';
import { print } from './middlewares/print';

export class App {
  server: Socket;
  client: Socket;

  curClient: RemoteInfo | null;

  constructor() {
    this.server = createSocket('udp4');
    this.server.on('error', (err) => {
      console.error('server err', err);
    });
    this.client = createSocket('udp4');

    this.client.on('error', (err) => {
      console.log('client err', err);
    });
    this.curClient = null;
    this.initMiddleware();
    this.init();
  }

  initMiddleware() {
    add(print);
  }

  init() {
    const { client, server } = this;
    client.on('message', (msg, rinfo) => {
      middlewares.forEach((fn) => {
        fn(null, {
          msg,
          rinfo,
          type: 'res',
        });
      });
      server.send(msg, this.curClient.port, this.curClient.address);
    });
    server.on('message', (msg, rinfo) => {
      middlewares.forEach((fn) => {
        fn({
          msg,
          rinfo,
          type: 'req',
        }, null);
      });
      this.curClient = rinfo;
      client.send(msg, 53, '223.5.5.5');
    });
  }

  listen() {
    this.server.bind({
      address: '127.0.0.1',
      port: 53,
    }, () => {
      console.log('dns serve in port 53');
    });

    this.client.bind({
      port: 5678,
    }, () => {
      console.log('client in port 5678');
    });
  }
}
