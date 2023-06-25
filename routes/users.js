var express = require('express');
const { users } = require('../controllers/users');
var router = express.Router();


// /users
router.delete('/', users);



module.exports = router;
