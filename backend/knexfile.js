import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV = 'development' } = process.env;

// Sadece PostgreSQL yapılandırması
const config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  }
};

export default config;
