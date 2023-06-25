const bcrypt = require('bcrypt');
const { prisma } = require('../prisma/prisma-client');
const jwt = require('jsonwebtoken');

/**
 * @route DELETE users/
 * @desc Give all users
 * @access Publick
 */
const users = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        const finallyUsers = users.map((el) => {
            el.password = undefined;
            el.email = undefined;
            el.bgPhoto = undefined;
            return el;
        })

        res.status(200).json(finallyUsers);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error});
    }

}

module.exports = {
    users
}