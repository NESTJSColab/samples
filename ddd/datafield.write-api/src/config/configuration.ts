import { IConfiguration } from './configuration.interface';

export default (): IConfiguration => ({
  apiPrefix: process.env.APP_API_PREFIX || 'api',
  port: parseInt(process.env.APP_PORT) || 3000,
  timeout: parseInt(process.env.APP_TIMEOUT) || 3000,
  baseUrl: process.env.APP_HOST || 'http=//localhost',
  api: {
    version: process.env.APP_VERSION || 'v1',
    key: process.env.APP_API_KEY || 'beyondnet',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'datavalidator-datafields',
    username: process.env.DB_USER || 'beyondnet',
    password: process.env.DB_PASSWORD || 'beyondnet',
    autoLoadEntities: Boolean(process.env.DB_AUTOLOAD_ENTITIES) || true,
    synchronize: Boolean(process.env.SYNCHRONIZE) || true,
  },
  eventsource: {
    connectionstring: process.env.ES_DB_CONNECTION_STRING,
  },
  logger: {
    name: process.env.LOGGER_NAME || 'DataValidator.Setup-API',
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: process.env.LOGGER_TARGET || 'pino-pretty',
            options: {
              singleLine: true,
              colorize: true,
              levelFirst: true,
            },
          }
        : undefined,
  },
  broker: {
    rabbitmq: {
      urls: [process.env.BROKER_URLS] || ['amqp://localhost:5672'],
      host: process.env.BROKER_HOST,
      queue: process.env.BROKER_QUEUE || 'datafields_queue',
      user: process.env.BROKER_DEFAULT_USER,
      password: process.env.BROKER_DEFAULT_PASSWORD,
    },
  },
});
