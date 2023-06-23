const bcrypt = require('bcrypt');
const { prisma } = require('../prisma/prisma-client');
const jwt = require('jsonwebtoken');

/**
 * @route GET users/
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

/**
 * @route POST users/register
 * @desc Create user
 * @access Publick
 */
const createUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.status(400).json({ message: 'please fill in the required fields' });
        }

        const createdUser = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (createdUser) {
            return res.status(400).json({ message: 'User with this email has already been created' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        const secret = process.env.JWT_SECRET;

        if (user && secret) {
            res.status(201).json({
                id: user.userId,
                email: user.email,
                name,
                token: jwt.sign({ id: user.userId }, secret, { expiresIn: '1d' })
            });
        }
        else {
            res.status(400).json({message: 'User was not created'})
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', error});
    }
}

module.exports = {
    users,
    createUser,
}