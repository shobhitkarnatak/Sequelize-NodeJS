-- Define model
sequelize.define('user',{
    
})

-- Insert (Create a user)
const jane = await User.create({ firstName: 'Jane', lastName: 'Doe' });
const jane = await User.bulkCreate({ firstName: 'Jane', lastName: 'Doe' });

-- Find all
const users = await User.findAll(); 

-- Attribute only
const users = await User.findAll({
    attributes:["firstName", "lastName"]
}); 

-- Rename attributes
const users = await User.findAll({
    attributes:[["firstName" as 'FN'], ["lastName" as "LN"]]
});

--Aggregation
The process of collecting and combining values from multiple rows of data to return a single, summarized value. 
const firstNameCount = await User.findAll({
    attributes: [sequelize.fn('COUNT', sequelize.col("firstName")),'count'] -- Length of total name
    attributes: ['firstName', [sequelize.fn('COUNT', sequelize.col('id')), 'count'], 'password'], -- Length of total id
    attributes: [sequelize.fn('SUM', sequelize.col("id")),'sum']
});

-- Include & Exclude
const users = await User.findAll({
    attributes:{
       include: [sequelize.fn('COUNT', sequelize.col("firstName")),'count']
       exclude : ["password"]
    }
})

-- Clause (Where)
await User.findAll({
    where:{
        id:[2,3,5], 
        isActive: true
    }
})

-- Sequalize operator
await User.findAll({
    where:{
        id:{
        [Op.eq] :2
        [Op.in] : [2, 3, 5]
        }
    }
})

await User.findAll({
    where:{
       [Op.and]: [{id:3},{isActive:true}]
        
    }
})

-- Update query
await User.update(
    {
        firstName:"Shobhit",
        age:34
    },
    {
        where:{
            id:14
        }
    }
)

-- Delete query
await User.destroy({
    where:{
        id:12
    }
})

-- Query finders
await User.findByPk(15)

await User.findOne({
    where:{
        firstName:"vivek"
    }
})

const [user, created] = await User.findOrCreate({
    where:{
        firstName:"vivek"
    },
    defaults:{
        firstName:"Ajay",
        lastName:"Ratra"
    }
})

-- Create
User.create(req.body)

-- Find & Update
User.findByPk(req.params.id)
User.update(req.body)

-- Delete
User.destroy()

-- Getter, Setter, Virtuals
firstName:{
    type:DataTypes.STRING,
    get(){
        const rowValue = this.getDataValue('firstName')
        return rowValue ? "Mr." + rowValue.toUpperCase():null
    }
}

lastName:{
    type:DataTypes.STRING,
    set(value){
       this.setDataValue('lastName', value+ "From India")
    }
}

fullName:{
    type:DataTypes.VIRTUAL,
    get(){
        return `${this.firstName} ${this.lastName}`
    }
    set(value){
        throw new Error("Don't set the full name")
    }
}

-- Validation & Constraints
Validations are checks performed in the Sequelize level & Constraints are rules defined at SQL level
sequelize.define('user',{
    password:{
        type:DataTypes.STRING(64),
        validate: {
            is: /^[0-9a-f]{64}$/i,
        }
    },
    age:{
        type:DataTypes.INTEGER,
        validate:{
            customValidator(value){
                if(value==null || this.age<=0){
                    throw new Error('Age can not be less than 0')
                }
            }
        }

    }
})

-- Raw queries
Using this for the complex query
const user = sequelize.query(`SELECT * FROM 'users'`,{
    type: QuertType.SELECT,
    plain: true  // Return first data
    model: UserModel,
    mapToModel: true
})

return res.status(200).json({user})

-- Associations
-- One To One : Person - Aadhar Card


-- One To Many : Customer - Account 


-- Many To One : Order - Products


-- Many To Many : Customer - Products




