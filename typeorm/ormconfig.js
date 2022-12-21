/* eslint-disable prettier/prettier */
module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'beyondnet',
  password: 'beyondnet',
  database: 'typeorm-nest',
  entities: ['dist/**/*.table{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true, // disabled for prod
  cli: {
    migrationsDir: 'src/migrations',
  },
};
