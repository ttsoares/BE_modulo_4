require("dotenv").config();

const BASE_CORE_DATA_DIR = process.env.PRODUCTION ? `dist` : `src`;

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,

  //host: process.env.DB_HOST,
  //port: process.env.DB_PORT,
  //username: process.env.DB_USERNAME,
  //password: process.env.DB_PASSWORD,
  //database: process.env.DATABASE,

  synchronize: false,
  logging: false,

  entities: [`${BASE_CORE_DATA_DIR}/core/data/database/entities/**/*`],
  migrations: [`${BASE_CORE_DATA_DIR}/core/data/database/migrations/**/*`],
  cli: {
    entitiesDir: "src/core/data/database/entities",
    migrationsDir: "src/core/data/database/migrations",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
