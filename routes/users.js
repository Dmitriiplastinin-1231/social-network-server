var express = require('express');
const { users, createUser } = require('../controllers/users');
var router = express.Router();


// /users
router.get('/', users);
// /users/register
router.post('/register', createUser)


module.exports = router;
