var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");

const { User } = require("../models");

// import fastest-validator
const v = new Validator();

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
    
    res.json(user);
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
