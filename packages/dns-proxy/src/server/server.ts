import { createServer, Server } from 'http';
import Koa from 'koa';
import { WebSocketServer } from 'ws';
import { Request } from '../dns/request';
import { Response } from '../dns/reponse';
import { responseEvent } from '../middlewares';

export class ServerWithWs extends Koa {
  server: Server;

  wsServer: WebSocketServer;

  port: number;

  constructor() {
    super();
    this.server = createServer(this.callback());
    this.port = 9999;

    this.initWsServer();
  }

  initWsServer() {
    const { server } = this;
    this.wsServer = new WebSocketServer({ server });
    this.wsServer.on('connection', (socket) => {
      responseEvent.on('response', (req, res) => {
        const { msg: reqMsg, rinfo: reqRinfo } = req;
        const { msg: resMsg, rinfo: resRinfo } = res;
        const reqObj = new Request(reqMsg);
        const resobj = new Response(resMsg);

        socket.send(
          JSON.stringify({
            req: {
              rinfo: reqRinfo,
              reqObj: reqObj.toArr()
            },
            res: {
              rinfo: resRinfo,
              resObj: resobj.toArr()
            }
          })
        );
      });
    });
  }

  start() {
    const { port } = this;

    this.server.listen(port, () => {
      console.log(`http server in port ${port}`);
    });
  }
}
