const { prisma } = require('../prisma/prisma-client');

/**
 * @route GET /message/interlocutors
 * @desc Give interlocutors
 * @assecc Private
 */
const getInterlocutors = async (req, res) => {
    try {
        const imId = req.user.userId;

        const interlocutors = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: imId },
                    { addresseeId: imId }
                ]
            },
            select: {
                addresseeId: true,
                sender: {
                    select: {
                        userId: true,
                        name: true
                    }
                }
            }
        });

        let id = [];
        let finishInterlocutors = [];
        for (let i = 0; i < interlocutors.length; i++) {
            const thisSenderId = interlocutors[i].sender.userId;
            const thisAddresseeId = interlocutors[i].addresseeId;

            if (!id.includes(thisSenderId) && thisSenderId !== imId) {

                finishInterlocutors.push(interlocutors[i].sender);
                id.push(thisSenderId);

            } else if (!id.includes(thisAddresseeId)) {

                const thisAddressee = await prisma.user.findFirst({ where: { userId: thisAddresseeId }, select: { name: true, userId: true } });
                finishInterlocutors.push(thisAddressee);

                id.push(thisAddressee.userId);
            }

        };


        res.status(200).json({ message: 'Interlocutors get seccussefuly', interlocutors: finishInterlocutors });
    } catch (error) {
        //500
        res.status(200).json({ message: 'Failed get interlocutors', error });
    }
}

/**
 * @route GET /message/:userId
 * @desc Give correspondence with one user
 * @assecc Private
 */
const getMessage = async (req, res) => {
    try {
        const { userId } = req.params;
        const Im = req.user;

        if (!userId) {
            //400
            return res.status(200).json({ message: 'No user ID' });
        }
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: Im.userId,
                        addresseeId: userId,
                    },
                    {
                        senderId: userId,
                        addresseeId: Im.userId
                    }
                ]
            },
            include: {
                sender: {
                    select: {
                        userId: true,
                        name: true,
                        status: true,
                        photo: true
                    }
                }
            }
        });

        res.status(200).json({ message: 'Messages received', messages });

    } catch (error) {
        //500
        res.status(200).json({ message: 'Failed get message', error })
    }
}

/**
 * @route POST /message/send/:userId
 * @desc Sends message
 * @access Private
 */
const sendMessage = async (req, res) => {
    try {
        const { userId } = req.params;
        const { text } = req.body;
        const Im = req.user;

        if (!userId || !text) {
            return res.status(200).json({ message: 'No user ID or text' });
        };

        const sendedMessage = await prisma.message.create({
            data: {
                text,
                senderId: Im.userId,
                addresseeId: userId
            },
            include: {
                sender: {
                    select: {
                        name: true,
                        userId: true,
                        status: true,
                        photo: true
                    }
                }
            }
        });

        res.status(201).json({ message: 'Message seccessfully sended', sendedMessage });
    } catch (error) {
        //500
        res.status(200).json({ message: 'Failed send message', error })
    }
}

/**
 * @route PUT /message/edit/:messageId
 * @desc edits message
 * @access Private
 */
const editMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { text } = req.body;
        const Im = req.user;

        console.log(Im.userId)

        if (!messageId || !text) {
            return res.status(200).json({ message: 'No message ID or text' });
        };

        const editedMessages = await prisma.message.updateMany({
            where: {
                senderId: Im.userId,
                id: messageId
            },
            data: { text }
        });

        if (editedMessages.count === 0) {
            //400
            return res.status(200).json({ message: 'Either message id incorrect or you is not the owner' });
        };

        res.status(200).json({ message: 'Message edited' });
    } catch (error) {
        //500
        res.status(200).json({ message: 'Failed edit message', error });
    }
}

/**
 * @route DELETE /message/delete/:messageId
 * @desc deletes message
 * @access Private
 */
const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const Im = req.user;

        if (!messageId) {
            return res.status(200).json({ message: 'No message ID' });
        }

        const deletedMessages = await prisma.message.deleteMany({
            where: {
                senderId: Im.userId,
                id: messageId
            }
        });

        if (deletedMessages.count === 0) {
            //400
            return res.status(200).json({ message: 'Either message id incorrect or you is not the owner' });
        };

        res.status(200).json({ message: 'Deleted seccessfully' });

    } catch (error) {
        //500
        res.status(200).json({ message: 'Failed delete message', error })
    }
}



module.exports = {
    getInterlocutors,
    getMessage,
    sendMessage,
    editMessage,
    deleteMessage
}