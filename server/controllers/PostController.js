import PostModel from '../models/Post.js';

class PostController {
    async getAll(req, res) {
        try {
            const posts = await PostModel.find().populate('user').exec();

            res.json(posts);
        } catch (error) {
            console.log(error);
            res.state(500).json({
                message: 'Не удалось получить статьи',
            });
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;

            const updatedPost = await PostModel.findByIdAndUpdate(
                {
                    _id: id,
                },
                {
                    $inc: { viewsCount: 1 },
                },
                {
                    returnDocument: 'after',
                }
            );

            if (!updatedPost) {
                return res.status(404).json({ message: 'Статья не найдена' });
            }

            res.json(updatedPost);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось получить статью',
            });
        }
    }

    async create(req, res) {
        try {
            const doc = new PostModel({
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            });

            const post = await doc.save();

            res.json(post);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось создать статью',
            });
        }
    }

    async remove(req, res) {
        try {
            const { id } = req.params;

            const post = await PostModel.findByIdAndDelete({ _id: id });

            if (!post) {
                console.log(error);
                res.status(500).json({ message: 'Статья не найдена' });
            }

            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Не удалось удалить статью' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const post = await PostModel.updateOne(
                { _id: id },
                {
                    title: req.body.title,
                    text: req.body.text,
                    imageUrl: req.body.imageUrl,
                    user: req.userId,
                    tags: req.body.tags,
                }
            );

            if (!post) {
                console.log(error);
                res.status(500).json({ message: 'Статья не найдена' });
            }

            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Не удалось обновить статью' });
        }
    }
}

export default new PostController();
