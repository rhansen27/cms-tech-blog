const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DBURL) {
  sequelize = new Sequelize(process.env.DBURL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  });
  console.log("here", process.env.DBURL);
} else {
  console.log("there");
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );
}
module.exports = sequelize;
