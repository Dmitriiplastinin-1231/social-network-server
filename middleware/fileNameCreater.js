const fileNameCreater = (name) => {
    return (req, res, next) => {
        req.fileName = name + Math.floor(Math.random() * 1000000);
        next();
    }
}

module.exports = fileNameCreater;