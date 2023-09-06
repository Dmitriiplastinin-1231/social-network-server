var express = require('express');
var router = express.Router();
var { Im, getUser, login, newStatus, editMe, deleteMe, createUser, saveProfilePhoto, saveBg } = require('../controllers/profile');
var { auth } = require('../middleware/auth');
var fileMiddleware = require('../middleware/photoSave');
var isUserDirExist = require('../middleware/isUserDirExist');
const fileNameCreater = require('../middleware/fileNameCreater');

// /profile/
router.get('/', auth, Im);
// /profile/login
router.post('/login', login);
// /profile/:id
router.get('/:id', getUser);
// /profile/status
router.put('/status', auth, newStatus);
// /profile/edit
router.put('/edit', auth,
    isUserDirExist,
    fileNameCreater('bgPhoto'),
    fileMiddleware.single('bg'),
    editMe
);
// /profile/delete
router.delete('/delete', auth, deleteMe);
// /profile/register
router.post('/register', createUser);
// /profile/photo
router.put('/photo',
    auth,
    isUserDirExist,
    fileNameCreater('profilePhoto'),
    fileMiddleware.single('profilePhoto'),
    saveProfilePhoto
);
// /profile/bgPhoto
router.put('/bgPhoto',
    auth,
    isUserDirExist,
    fileNameCreater('bgPhoto'),
    fileMiddleware.single('bg'),
    saveBg
)

module.exports = router;