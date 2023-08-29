const fs = require("fs");


/**
 * @desc middleware in order to check for the presence of a user folder. If it does not exist, then create
 * @param {Object} req.user with userId
 * @param {String} req.dirPath path to folder
 */
const isUserDirExist = async (req, res, next) => {
    const dirPath = './upload/' + req.user.userId;
    console.log(1)
    if (fs.existsSync(dirPath)) {
        req.dirPath = dirPath;
        next();
    }
    else {
        fs.mkdir(dirPath, function (error) {
            if (error) {
                console.log(error);
                return res.status(200).message({ message: 'User folder not found', error })
            } else {
                req.dirPath = dirPath;
                next();
            }
        });
    }
};

module.exports = isUserDirExist;