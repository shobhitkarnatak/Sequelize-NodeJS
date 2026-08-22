-- Define model
sequelize.define(''{})

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


