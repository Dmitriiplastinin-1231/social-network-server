var express = require('express');
var router = express.Router();
var { Im, getUser, login, newStatus, editMe, deleteMe, createUser, saveProfilePhoto } = require('../controllers/profile');
var { auth } = require('../middleware/auth');
var fileMiddleware = require('../middleware/photoSave');
var isUserDirExist = require('../middleware/isUserDirExist');

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
router.delete('/delete', auth, deleteMe);
// /profile/register
router.post('/register', createUser);
// /profile/photo
router.put('/photo',
    auth,
    isUserDirExist,
    (req, res, next) => {
        req.fileName = 'profilePhoto' + Math.floor(Math.random()*1000000);
        next();
    },
    fileMiddleware.single('profilePhoto'),
    saveProfilePhoto
);

module.exports = router;