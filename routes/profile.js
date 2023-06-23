var express = require('express');
var router = express.Router();
const { Im, getUser, login, newStatus, editMe, deleteMe } = require('../controllers/profile');
const { auth } = require('../middleware/auth');

// /profile/
router.post('/', auth, Im);
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

module.exports = router;