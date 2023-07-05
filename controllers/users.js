const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET users/
 * @desc Give all users
 * @access Public
 */
const users = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        const finallyUsers = users.map((el) => {
            delete el.password;
            delete el.email;
            delete el.bgPhoto;

            return el;
        })

        res.status(200).json(finallyUsers);
    }
    catch (error) {
        return res.status(200).json({ message: 'Server error', error});
    }

}

module.exports = {
    users
}