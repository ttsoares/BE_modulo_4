require("dotenv").config();

let BASE_CORE_DATA_DIR = `src`;
let custom_url = process.env.LOCAL_DATABASE_URL;

if (process.env.PROD) {
  BASE_CORE_DATA_DIR = `dist`;
  custom_url = process.env.DATABASE_URL;
}

console.log(custom_url, "%%%%%%%%%%%", BASE_CORE_DATA_DIR);

module.exports = {
  type: "postgres",
  url: `${custom_url}`,
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
