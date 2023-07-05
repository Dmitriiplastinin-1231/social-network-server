const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /post/
 * @desc Give all posts
 * @access Public
 */
const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                title: true,
                text: true,
                id: true,
                author: {
                    select: {
                        userId: true,
                        photo: true,
                        name: true,
                        status: true
                    }
                }
            }
        });

        res.status(200).json({ message: 'Getting posts successfully', posts });

    } catch (error) {
        //500
        res.status(200).json({ message:'Failed to get posts', error })
    }
};

/**
 * @route GET /post/:id
 * @desc Give all user posts
 * @access Public
 */
const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;

        const posts = await prisma.post.findMany({
            where: {
                authorId: id
            },
        });

        res.status(200).json({ message: 'Getting posts successfully', posts });

    } catch (error) {
        //500
        res.status(200).json({ message: 'Failed to get posts', error });
    }
}

/**
 * @route POST /post/create
 * @desc Creates post
 * @access Private
 */
const createPost = async (req, res) => {
    try {
        const data = req.body;
        const user = req.user;

        if (!data.text) {
            //400
            return res.status(200).json({ message: 'Unable to create a post without text' });
        }

        const post = await prisma.post.create({
            data: {
                ...data,
                authorId: user.userId
            }
        });

        res.status(201).json({ message: 'Post was seccessfully created', post });

    } catch (error) {
        //500
        res.status(200).json({ message: 'Failed to create posts', error })
    }
};

/**
 * @route PUT /post/edit
 * @desc Edits post
 * @access Private
 */
const editPost = async (req, res) => {
    try {
        const { data, id } = req.body;
        const authorId = req.user.userId;
        if (!data.text || !id) {
            //400
            return res.status(200).json({ message: 'No data' });
        }


        const editedPost = await prisma.post.updateMany({
            where: { id, authorId },
            data
        });

        if (editedPost.count === 0) {
            //400
            return res.status(200).json({ message: 'Either post id incorrect or user is not the owner' });
        };

        res.status(200).json({ message: 'Post edited' });

    } catch (error) {
        //500
        res.status(200).json({ message: 'Failed to edit post', error });
    }

};

/**
 * @route DELETE /post/delete
 * @desc Deletes post
 * @access Private
 */
const deletePost = async (req, res) => {
    try {
        const id = req.body.id;
        const authorId = req.user.userId;
        console.log(req.body)
        if (!id) {
            //400
            return res.status(200).json({ message: 'No postId' });
        };

        const deleteData = await prisma.post.deleteMany({
            where: { id, authorId }
        });

        if (deleteData.count === 0) {
            return res.status(200).json({ message: 'Either post id incorrect or user is not the owner' });
        }

        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        //500
        res.status(200).json({ message: 'Failed to delete post', error });
    }
};

module.exports = {
    getAllPosts,
    getUserPosts,
    createPost,
    editPost,
    deletePost
}