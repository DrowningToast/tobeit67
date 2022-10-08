const path = require("path");

module.exports = ({ env }) => ({
  // connection: {
  //   client: "sqlite",
  //   connection: {
  //     filename: path.join(
  //       __dirname,
  //       "..",
  //       env("DATABASE_FILENAME", ".tmp/data.db")
  //     ),
  //   },
  //   useNullAsDefault: true,
  // },
  connection: {
    client: "postgres",
    connection: {
      host: "localhost",
      port: env.int("POSTGRES_SERVER_PORT", 5432),
      database: env("POSTGRES_CMS_DB_NAME", "tobeit-cms"),
      user: env("POSTGRES_USERNAME", "tobeit"),
      password: env("POSTGRES_PASSWORD", "tobeit"),
      ssl: env.bool("DATABASE_SSL", false),
    },
    // connection: {
    //   host: "localhost",
    //   port: 9876,
    //   database: "app",
    //   user: "db_username",
    //   password: "db_password",
    //   ssl: env.bool("DATABASE_SSL", false),
    // },
    ssl: {
      rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
    },
  },
});
