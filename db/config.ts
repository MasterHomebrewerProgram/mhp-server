import { Dialect, Sequelize } from "sequelize";
let sequelizeConnection;

if (process.env.NODE_ENV === "development") {
  sequelizeConnection = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite3",
    logging: false,
  });
} else {
  const dbName = process.env.DB_NAME as string;
  const dbUser = process.env.DB_USER as string;
  const dbHost = process.env.DB_HOST;
  const dbDriver = process.env.DB_DRIVER as Dialect;
  const dbPassword = process.env.DB_PASSWORD;

  sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
  });
}

export default sequelizeConnection;
