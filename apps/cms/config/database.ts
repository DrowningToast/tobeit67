export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env(
        env("NODE_ENV") === "production"
          ? env("POSTGRES_SERVER_URL_PROD")
          : env("DATABASE_HOST"),
        "0.0.0.0"
      ),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "tobeit-cms"),
      user: env("DATABASE_USERNAME", "tobeit"),
      password: env("DATABASE_PASSWORD", "tobeit"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
