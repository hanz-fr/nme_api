var express = require("express");
const router = express.Router();

const controller = require('../controllers/userController');


router.get('/', controller.getUser); // GET ROUTE
router.post('/', controller.createUser); // POST ROUTE

module.exports = router;
