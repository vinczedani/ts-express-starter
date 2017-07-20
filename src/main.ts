import { Server } from './server';
import { config } from './config';
import { logger } from './utils/logger';

const server = Server.bootstrap();

const port = config.get('port');

server.app.listen(port, () => {
  logger.info(`Server started on port: ${port}`);
});
