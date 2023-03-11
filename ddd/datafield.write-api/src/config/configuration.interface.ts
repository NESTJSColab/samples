export interface IConfiguration {
  apiPrefix: string;
  port: number;
  timeout: number;
  baseUrl: string;
  api: {
    version: string;
    key: string;
  };
  db: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    autoLoadEntities: boolean;
    synchronize: boolean;
  };
  eventsource: {
    connectionstring: string;
  };
  logger: {
    name: string;
    level: string;
    transport: {
      target: string;
      options: {
        singleLine: boolean;
        colorize: true;
        levelFirst: true;
      };
    };
  };
  broker: {
    rabbitmq: {
      urls: string[];
      host: string;
      queue: string;
      user: string;
      password: string;
    };
  };
}
