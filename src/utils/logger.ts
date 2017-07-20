import * as bunyan from 'bunyan';
import { config } from '../config';

export const logger = bunyan.createLogger({
  name: 'CodingSans - Project',
  level: config.get('loglevel'),
});
