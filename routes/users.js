var express = require('express');
var { users } = require('../controllers/users');
var router = express.Router();


// /users
router.get('/', users);



module.exports = router;
