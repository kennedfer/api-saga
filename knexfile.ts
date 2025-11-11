import type { Knex } from "knex";

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: Boolean(process.env.DB_SSLMODE)
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
    seeds: { directory: "./seeds" },
  },
  staging: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
    seeds: { directory: "./seeds" },
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
    seeds: { directory: "./seeds" },
  },
};

export default config;
