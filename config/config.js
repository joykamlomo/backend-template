module.exports = {
  development: {
    // If you want to use PostgreSQL, uncomment the following block and comment out the MongoDB block below
    // database: {
    //   host: process.env.DB_HOST || "localhost",
    //   port: process.env.DB_PORT || 5432,
    //   name: process.env.DB_NAME || "my_database",
    //   dialect: "postgres",
    //   username: process.env.DB_USERNAME || "postgres",
    //   password: process.env.DB_PASSWORD || "postgres",
    // },
    // If you want to use MongoDB, uncomment the following block and comment out the PostgreSQL block above
    // database: {
    //   host: process.env.DB_HOST || "localhost",
    //   port: process.env.DB_PORT || 27017,
    //   name: process.env.DB_NAME || "my_database",
    //   dialect: "mongo",
    //   username: process.env.DB_USERNAME || "",
    //   password: process.env.DB_PASSWORD || "",
    // },
    // If you want to use SQL, uncomment the following block and comment out the other two blocks above
    // database: {
    //   host: process.env.DB_HOST || "localhost",
    //   port: process.env.DB_PORT || 3306,
    //   name: process.env.DB_NAME || "my_database",
    //   dialect: "sql",
    //   username: process.env.DB_USERNAME || "root",
    //   password: process.env.DB_PASSWORD || "",
    // },
    jwtSecret: process.env.JWT_SECRET || "my_secret_key",
    port: process.env.PORT || 3000,
    api: {
      prefix: "/api/v1",
    },
  },
  test: {
    // Same as development
    // ...
  },
  production: {
    // Same as development
    // ...
  },
};
