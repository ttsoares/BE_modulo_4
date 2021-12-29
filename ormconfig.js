require("dotenv").config();

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  entities: ["dist/core/data/database/entities/**/*"],
  migrations: ["dist/core/data/database/migrations/**/*"],
  cli: {
    entitiesDir: "dist/core/data/database/entities",
    migrationsDir: "dist/core/data/database/migrations",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
