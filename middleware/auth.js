const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'not authorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // res.status(200).json(decoded)
        const user = await prisma.user.findUnique({
            where: {
                userId: decoded.id
            }
        });
        req.user = user;

        next();
    }
    catch (err) {
        res.status(401).json({ message: 'not authorized' })
    }
}

module.exports = {
    auth
}