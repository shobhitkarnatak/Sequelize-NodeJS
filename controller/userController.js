const { sequelize } = require("../config/dbConnect");
const { userSchema } = require("../middleware/userValidate");
const { CourseModel } = require("../model/courseModel");
const { PostModel } = require("../model/postModel");
const { ProfileModel } = require("../model/profileModel");
const { StudentModel } = require("../model/studentModel");
const { UserModel } = require("../model/userModel");

// Create and validate user
const createUsers = async (req, res) => {
  console.log(req.body);
  try {

    // Many to many relation
    const shobhit = await StudentModel.create({ name: "Shobhit" });
    const rahul = await StudentModel.create({ name: "Rahul" });

    const maths = await CourseModel.create({ title: "Maths" });
    const physics = await CourseModel.create({ title: "Physics" });

    // Add courses
    await shobhit.addCourses([maths, physics]);
    await rahul.addCourse(physics);

    // Get courses of a student
    // const math = await shobhit.getCourses();

    // Set courses of a student
    // Add courses to a student
    // Remove courses from a student

    // One to one relation
    // const user = await UserModel.create({ username: "shobhit" });
    // const profile = await ProfileModel.create({
    //   bio: "Hello I am shobhit",
    //   userId: user.id,
    // });

    // one to many relation
    // const post1 = await PostModel.create({
    //   content: "This is my first post",
    //   userId: user.id,
    // });

    // const post2 = await PostModel.create({
    //   content: "This is my second post",
    //   userId: user.id,
    // });
    // const { error } = userSchema.validate(req.body);
    // if (error) return res.status(400).json({ error: error.details[0].message });
    // const user = await UserModel.create(req.body);
    return res.status(200).json({ maths });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const getUsers = async (req, res) => {
  try {
    // Sequelize Method
    // const users = await UserModel.findAll();

    // Association Method to get user with profile
    // const userWithProfile = await UserModel.findAll({
    //   include: [
    //     {
    //       model: ProfileModel,
    //       as: "profile",
    //     },
    //   ],
    // });

    // Many to many relation
    const userWithPost = await StudentModel.findAll({
      include: [
        {
          model: CourseModel,
        },
      ],
    });


    // one to many relation
    // const userWithPost = await UserModel.findAll({
    //   include: [
    //     {
    //       model: PostModel,
    //       as: "posts",
    //     },
    //   ],
    // });
    // Raw query
    // const [results, metadata] = await sequelize.query("SELECT * FROM users");
    // const users = await sequelize.query("SELECT * FROM users", {
    //   type: sequelize.QueryTypes.SELECT,

    //   // Virtual field : It populates the data combination of firstName and lastName as fullName
    //   model: UserModel,
    //   mapToModel: true,

    //   // Only first data will be removed
    //   plain:true
    // });

    return res.status(200).json({ userWithPost });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserModel.findByPk(id);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) return res.status(500).json({ error: "User not found" });
    await user.update(req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) return res.status(500).json({ error: "User not found" });
    await user.destroy(req.body);
    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

// const insert = async (req, res) => {
//   const data = UserModel.build({ name: "john" });
//   console.log("name", data.name);
//   await data.save();
//   const data = await UserModel.create({ name: "vinit" });
//   await data.save();
//   const newUser = {
//     name: "Vipin",
//     favoriteColor: "Yellow",
//     age: 28,
//     cash: 450000,
//   };
// Create user
/*  const userDetails = await UserModel.create(newUser);  
  const userDetails = await UserModel.create(newUser);
   const userDetails = await UserModel.createBulk(newUser);
   return res.json(userDetails); */
// Select queries
/* const users = await UserModel.findAll();
  return res.json(users);*/
//  Specifying attribute only
/*       const users = await UserModel.findAll({
          attributes: ['name', 'age']
      });
      return res.json(users); */
// Rename attributes
/*  const users = await UserModel.findAll({
      attributes: [['name', 'userName'], ['age','yrs']]
  });
  return res.json(users); */
// Aggregation using sequalize fn
/*  const ageCount = await UserModel.findAll({
      attributes: [[sequelize.fn("SUM", sequelize.col("age")), "count"]]
    })
    return res.json(ageCount); */
//Exclude attributes
/* const users = await UserModel.findAll({
      attributes:{
          exclude:['name']
      }
  });
  return res.json(users); */
//Find by PK
/* const user = await UserModel.findByPk(42);
  return res.json(user); */
// };

module.exports = { createUsers, getUsers, getUserById, updateUser, deleteUser };
