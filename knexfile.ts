import { Knex } from "knex";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    useNullAsDefault: true,
  },
};

export default config;
