const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @route GET /profile/
 * @desc Give info about logged in user
 * @access Private
 */
const Im = async (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        res.status(200).json({ message: 'Error sendind data', error });
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
            },
            include: {
                posts: {}
            }
        });
        if (!user) {
            return res.status(200).json({ message: 'There is no such user' });
        }

        user.password = undefined;
        res.status(200).json(user);
    }
    catch (error) {
        res.status(200).json({ message: 'Failed to get the user', error });
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
            // res.status(200).json({
            //     name: user.name,
            //     token: jwt.sign({ id: user.userId }, secret, { expiresIn: '2d' })
            // });
            res.cookie('token', jwt.sign({ id: user.userId }, secret, { expiresIn: '2d' }));
            res.send('');
        }
        else {
            res.status(200).json({ message: 'Email or password uncorrect' });
        }

    }
    catch (error) {
        res.status(200).json({ message: 'Login fail', error })
    }
};

/**
 * @route POST profile/register
 * @desc Create user
 * @access Public
 */
const createUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;
        if (!name || !password || !email) {
            return res.status(200).json({ message: 'please fill in the required fields' });
        }

        const createdUser = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (createdUser) {
            return res.status(200).json({ message: 'User with this email has already been created' });
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
            // res.status(201).json({
            //     id: user.userId,
            //     email: user.email,
            //     name,
            //     token: jwt.sign({ id: user.userId }, secret, { expiresIn: '1d' })
            // });
            res.cookie('token', jwt.sign({ id: user.userId }, secret, { expiresIn: '1d' }));
            res.send('');
        }
        else {
            res.status(200).json({ message: 'User was not created' })
        }
    }
    catch (error) {
        return res.status(200).json({ message: 'Server error', error });
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

        await prisma.user.update({ where: { userId: im.userId }, data });

        res.status(201).json({ message: 'Status Update', status: data.status});
    }
    catch (error) {
        res.status(200).json({ message: 'Set status failed' , error});
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

        delete data.password;
        delete data.id;
        delete data.email;


        const im = req.user;
        const newIm = await prisma.user.update({ where: { userId: im.userId }, data});

        res.status(201).json({message: 'Set data successful', user: newIm})
    }
    catch (error) {
        res.status(200).json({ message: 'Set data failed', error});
    }
};

/**
 * @route DELETE /profile/delete
 * @desc Delete me
 * @access Private
 */
const deleteMe = async (req, res) => {
    try {
        const im = req.user;

        await prisma.user.delete({ where: { userId: im.userId } });

        res.status(200).json({ message: 'User was deleted' })
    }
    catch (error) {
        res.status(200).json({ message: 'Delete error', error });
    }
}

module.exports = {
    Im,
    getUser,
    createUser,
    login,
    newStatus,
    editMe,
    deleteMe
}
