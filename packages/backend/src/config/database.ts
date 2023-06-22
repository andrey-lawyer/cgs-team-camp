/* eslint-disable no-console */
import { createConnection, DataSourceOptions } from 'typeorm';

import Todo from '../entities/Todo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSSLConfig(env: string) {
  const configs: { [key: string]: boolean | { [key: string]: boolean } } = {
    production: { rejectUnauthorized: true },
    local: false,
    deploy: { rejectUnauthorized: false }
  };
  if (!configs[env] === undefined) {
    throw new Error('Set network in your .env file');
  }
  return configs[env];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// type env = string | undefined;

const connectDB = async () => {
  try {
    const options: DataSourceOptions = {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      logging: ['query', 'error'],
      type: 'postgres',
      // entities: ['dist/**/*.entity.{ts,js}'],
      entities: [Todo],
      migrations: ['dist/migrations/**/*.{ts,js}'],
      subscribers: ['src/subscriber/**/*.ts'],
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      // ssl: getSSLConfig(process.env.SERVER_MODE),
      ssl: false,
      synchronize: true
    };
    await createConnection(options);
    console.log('MongoDB Connected...');
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
