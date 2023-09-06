const multer = require('multer');


/**
 * @desc Save photo in user folder
 * @param {String} req.dirPath Path to folder
 * @param {String} req.fileName File name
*/
const storage = multer.diskStorage({
    destination(req, file, cb) {
        // dir path
        const path = req.dirPath;

        cb(null, path);
    },
    filename(req, file, cb) {

        let fileName = req.fileName + '.' + file.mimetype.split('/')[1];

        cb(null, fileName);
    }
});

// filter for photo
const types = ['image/png', 'image/jpg', 'image/jpeg'];
const fileFilter = (req, file, cb) => {
    console.log(file)
    if (types.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

module.exports = multer({ storage, fileFilter });