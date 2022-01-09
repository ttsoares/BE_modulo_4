require("dotenv").config();

module.exports = {
  type: "postgres",
  url: process.env.R_DATABASE_URL,

  synchronize: false,
  logging: false,

  //${__dirname}

  entities: [`dist/core/data/database/entities/**/*`],
  migrations: [`dist/core/data/database/migrations/**/*`],
  cli: {
    entitiesDir: `src/core/data/database/entities`,
    migrationsDir: `src/core/data/database/migrations`,
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
