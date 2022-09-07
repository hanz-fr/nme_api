const Validator = require("fastest-validator");
const { User, sequelize } = require("../models");

// import fastest-validator
const v = new Validator();



// GET ALL USER CONTROLLER
exports.getUser = async (req, res) => {
  const users = await sequelize.query("SELECT * FROM users", {
    model: User,
    mapToModel: true,
  });
  res.status(200).json(users);
};





// CREATE USER CONTROLLER
exports.createUser = async (req, res) => {
  try {
    // validate incoming request using fastest-validator
    const schema = {
      name: { type: "string" },
      age: { type: "number", min: 1, max: 99 },
      email: { type: "string" },
      address: { type: "string", min: 10, max: 255 },
      phone: { type: "number" },
    };

    const validate = v.validate(req.body, schema);


    // check if validation is success or not
    if (validate.length) {
      return res.status(400).json(validate);
    }

    // find user where email already exist.
    const userEmailExist = await User.findOne({
        where: { email: req.body.email }
    });

    // find user where phone already exist.
    const userPhoneExist = await User.findOne({
        where: { phone: req.body.phone }
    })
    

    
    // return error message to client if email already exist.
    if (userEmailExist) {
        return res.status(409).json({
            status: 'error',
            message: 'Email already exist'
        });
    }

    // return error message to client if phone already exist.
    if (userPhoneExist) {
        return res.status(409).json({
            status: 'error',
            message: 'Phone already exist'
        });
    }

    var user = await User.create(req.body);

    res.status(200).json({
      status: "Successfully addded user.",
      user,
    });
  } catch (error) {
      console.log(error);
      res.status(500);
      res.send({ status: "error", message: "Something went wrong. :(" });
  }
};
