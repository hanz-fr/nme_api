var express = require("express");
const router = express.Router();

const controller = require('../controllers/userController');

router.get('/', controller.getUsers); // GET ALL USER ROUTE
router.post('/', controller.createUser); // POST USER ROUTE
router.put('/:id', controller.updateUser); // UPDATE USER ROUTE
router.get('/:id', controller.getUser); // GET USER ROUTE
router.delete('/:id', controller.deleteUser) // DELETE USER

module.exports = router;
