var express = require('express');
var router = express.Router();
var { auth } = require('../middleware/auth');
var { getMessage, sendMessage, editMessage, deleteMessage, getInterlocutors } = require('../controllers/message');

// /message/interlocutors
router.get('/interlocutors', auth, getInterlocutors)
// /message/:userId
router.get('/:userId', auth, getMessage);
// /message/send/:uderId
router.post('/send/:userId', auth, sendMessage);
// /message/edit/:messageId
router.put('/edit/:messageId', auth, editMessage);
// /message/delete/:messageId
router.delete('/delete/:messageId', auth, deleteMessage);

module.exports = router;