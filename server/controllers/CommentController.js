import CommentModel from '../models/Comment.js';

class CommentController {
    async create(req, res) {
        try {
            const { comment, postId, imageUrl } = req.body;

            const doc = new CommentModel({
                comment,
                post: postId.toString(),
                imageUrl,
                user: req.userId,
            });

            const newComment = await (await doc.save()).populate('user');

            res.send(newComment);
        } catch (error) {
            res.status(500).json({
                message: 'Не удалось создать комментарий',
            });
        }
    }

    async getCommentById(req, res) {
        try {
            const { id } = req.query;

            const comments = await CommentModel.find({ post: id }).populate(
                'user'
            );

            res.send(comments);
        } catch (error) {
            res.status(500).json({
                message: 'Не удалось получить комментарии',
            });
            console.log(error);
        }
    }
}

export default new CommentController();
