const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.cookie?.split('=')[1];

        if (!token) {
            return res.status(200).json({ message: 'not authorized' });
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
        res.status(200).json({ message: 'not authorized' })
    }
}

module.exports = {
    auth
}