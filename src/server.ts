import * as express from 'express';
import * as bodyParser from 'body-parser';

export class Server {
  public static bootstrap(): Server {
    return new Server();
  }

  public app: express.Application;

  constructor() {
    this.app = express();
  }
}
