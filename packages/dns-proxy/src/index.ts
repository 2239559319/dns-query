import { App } from './manager';
import { ServerWithWs } from './server/server';

const app = new App();
app.listen();

const httpServe = new ServerWithWs();
httpServe.start();
