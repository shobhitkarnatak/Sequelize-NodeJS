const express = require("express");
const { router } = require("./routes/router");
const { dbConnection, sequelize } = require("./config/dbConnect");
const setupSwagger = require("./swagger");
require("./association");

const { StudentModel } = require("./model/studentModel");
const { CourseModel } = require("./model/courseModel");
const { UserModel } = require("./model/userModel");
// const { insert } = require("./controller/userController");


const app = express();
app.use(express.json());

setupSwagger(app);
app.use("/", router);

const startServer = async () => {
  try {
    await dbConnection();
    await sequelize.sync({force:false});

    //   insert()
    console.log("✅ Database synced successfully");

    // Start Express server
    app.listen(3000, () => {
      console.log("🚀 Server running at http://localhost:3000");
      console.log("📄 Swagger docs at http://localhost:3000/api-docs");
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

startServer();
