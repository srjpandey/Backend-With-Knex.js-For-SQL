import knex from "knex";
import config from "../../knexfile";

if (!process.env.DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

if (!process.env.DB_USER) {
  throw new Error("DB_USER is not defined");
}

const db = knex(config.development);

export default db;
