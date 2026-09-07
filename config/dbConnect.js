const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "myapp",
  process.env.DB_USER || "user",
  process.env.DB_PASSWORD || "admin@123",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
  // pool:{
  //   max:5, // upto 5 connection at time
  //   min:2, // keep 2 connection alwasy open
  //   acquire:30000, //wait 30 sec to get connection from pool
  //   idle:10000 // if connection is idle for 10 sec then close it
  // }
});

const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("db connected");
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

module.exports = { dbConnection, sequelize };

