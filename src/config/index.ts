import * as convict from 'convict';

export const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  loglevel: {
    doc: 'Level of the printed logs',
    format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
    default: 'info',
    env: 'LOGLEVEL',
    arg: 'loglevel',
  },
});

// Perform validation
config.validate({allowed: 'strict'});
