import MessageModel from '../models/Message.js';
import UserModel from '../models/User.js';

class MessageController {
    async create(data) {
        try {
            const { message, imageUrl, from, to } = data;

            const doc = new MessageModel({ message, imageUrl, from, to });

            const newMessage = await (
                await (await doc.save()).populate('from')
            ).populate('to');

            return {
                message: newMessage.message,
                to: {
                    _id: newMessage.to._id,
                    fullName: newMessage.to.fullName,
                    email: newMessage.to.email,
                    avatarUrl: newMessage.to.avatarUrl,
                    createdAt: newMessage.to.createdAt,
                    updatedAt: newMessage.to.updatedAt,
                    __v: newMessage.to.__v,
                },
                from: {
                    _id: newMessage.from._id,
                    fullName: newMessage.from.fullName,
                    email: newMessage.from.email,
                    avatarUrl: newMessage.from.avatarUrl,
                    createdAt: newMessage.from.createdAt,
                    updatedAt: newMessage.from.updatedAt,
                    __v: newMessage.from.__v,
                },
                createdAt: newMessage.createdAt,
                updatedAt: newMessage.updatedAt,
            };
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(req, res) {
        try {
            const { userOne, userTwo } = req.query;

            const messages = await MessageModel.find({
                $or: [
                    { from: userOne, to: userTwo },
                    { from: userTwo, to: userOne },
                ],
            })
                .populate('from')
                .populate('to')
                .sort('createdAt')
                .exec();

            res.send(messages);
        } catch (error) {
            res.status(500).json({
                message: 'Не удалось получить сообщения',
            });
            console.log(error);
        }
    }

    async getDialogs(req, res) {
        const id = req.userId;

        const fromDialogs = await MessageModel.find({ from: id }).distinct(
            'to'
        );

        const toDialogs = await MessageModel.find({ to: id }).distinct('from');

        const setDialogs = new Set(fromDialogs.map((item) => item.toString()));

        toDialogs.forEach((item) => {
            setDialogs.add(item.toString());
        });

        const result = [];
        setDialogs.forEach((item) => result.push(item));

        const users = [];

        for (let i = 0; i < result.length; i++) {
            const user = await UserModel.find({ _id: result[i] });
            users.push(user);
        }

        res.send(users.flat());
    }

    async newMessage(req, res) {
        try {
            const { message, imageUrl, to } = req.body;

            const from = req.userId;

            const doc = new MessageModel({ message, imageUrl, from, to });

            const newMessage = await (
                await (await doc.save()).populate('from')
            ).populate('to');

            res.send({
                message: newMessage.message,
                to: {
                    _id: newMessage.to._id,
                    fullName: newMessage.to.fullName,
                    email: newMessage.to.email,
                    avatarUrl: newMessage.to.avatarUrl,
                    createdAt: newMessage.to.createdAt,
                    updatedAt: newMessage.to.updatedAt,
                    __v: newMessage.to.__v,
                },
                from: {
                    _id: newMessage.from._id,
                    fullName: newMessage.from.fullName,
                    email: newMessage.from.email,
                    avatarUrl: newMessage.from.avatarUrl,
                    createdAt: newMessage.from.createdAt,
                    updatedAt: newMessage.from.updatedAt,
                    __v: newMessage.from.__v,
                },
                createdAt: newMessage.createdAt,
                updatedAt: newMessage.updatedAt,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MessageController();
