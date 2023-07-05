var express = require('express');
var router = express.Router();
var { Im, getUser, login, newStatus, editMe, deleteMe, createUser } = require('../controllers/profile');
var { auth } = require('../middleware/auth');

// /profile/
router.get('/', auth, Im);
// /profile/login
router.post('/login', login);
// /profile/:id
router.get('/:id', getUser);
// /profile/status
router.put('/status', auth, newStatus);
// /profile/edit
router.put('/edit', auth, editMe);
// /profile/delete
router.delete('/delete', auth, deleteMe)
// /users/register
router.post('/register', createUser)

module.exports = router;