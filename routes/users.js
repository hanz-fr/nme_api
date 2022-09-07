var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { User, sequelize } = require("../models");

// import fastest-validator
const v = new Validator();


// GET ROUTE
router.get('/', async (req, res) => {
  const users = await sequelize.query('SELECT * FROM users', {
    model: User,
    mapToModel: true,
  })
  res.status(200).json(users);
});


// POST ROUTE
router.post("/", async (req, res) => {
  try {
    // validate incoming request using fastest-validator
    const schema = {
      name: "string",
      age: "number",
      email: "string",
      address: "string|optional",
      phone: "number",
    };

    const validate = v.validate(req.body, schema);

    // check if validation is success or not
    if (validate.length) {
      return res.status(400).json(validate);
    }
    
    var user = await User.create(req.body);
    
    res.status(200).json({
      "status": "Successfully addded user.",
      user       
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(403);
      res.send({ status: "error", message: "Email already exists" });
    } else {
      res.status(500);
      res.send({ status: "error", message: "Something went wrong. :(" });
    }
  }
});

module.exports = router;
