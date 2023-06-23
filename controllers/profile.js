const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route POST /profile/
 * @desc Give info about logged in user
 * @access Private
 */
const Im = async (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error sendind data', error });
    }
};

/**
 * @route GET /profile/:id
 * @desc Get info about one user
 * @access Public
 */
const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findFirst({
            where: {
                userId: id
            }
        });
        if (!user) {
            return res.status(400).json({ message: 'There is no such user' });
        }

        user.password = undefined;
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get the user', error });
    }
};

/**
 * @route POST /profile/login
 * @desc login
 * @access Public
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

        const secret = process.env.JWT_SECRET;

        if (user && isPasswordCorrect && secret) {
            res.status(200).json({
                name: user.name,
                token: jwt.sign({ id: user.userId }, secret, { expiresIn: '2d' })
            });
        }
        else {
            res.status(400).json({ message: 'Email or password uncorrect' });
        }

    }
    catch (error) {
        res.status(500).json({ message: 'Login fail', error })
    }
};

/**
 * @route PUT /profile/status
 * @desc Set status
 * @access Private
 */
const newStatus = async (req, res) => {
    try {
        const data = req.body;
        const im = req.user;
        if (!im) {
            res.status(400).json({ message: 'User undefined' });
        }
        await prisma.user.update({ where: {userId: im.userId}, data });

        res.status(200).json({ message: 'Status Update', status: data.status});
    }
    catch (error) {
        res.status(500).json({ message: 'Set status failed' , error});
    }

};

/**
 * @route PUT /profile/edit
 * @desc Set data about me
 * @access Private
 */
const editMe = async (req, res) => {
    try {
        const data = req.body;
        const im = req.user;
        const newIm = await prisma.user.update({ where: { userId: im.userId }, data });

        res.status(200).json({message: 'Set data successful', user: newIm})
    }
    catch (error) {
        res.status(500).json({ message: 'Set data failed', error});
    }
};

/**
 * @route PUT /profile/delete
 * @desc Delete me
 * @access Private
 */
const deleteMe = async (req, res) => {
    try {
        const im = req.user;

        await prisma.user.delete({ where: { userId: im.userId } });

        res.status(200).json({message: 'User was deleted'})
    }
    catch (error) {
        res.status(500).json({ message: 'Delete error', error});
    }
}

module.exports = {
    Im,
    getUser,
    login,
    newStatus,
    editMe,
    deleteMe
}