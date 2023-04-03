import PostModel from '../models/Post.js';

class PostController {
    async getLastTags(req, res) {
        try {
            const posts = await PostModel.find()
                .limit(5)
                .sort('-createdAt')
                .exec();

            const tags = posts
                .map((obj) => obj.tags)
                .flat()
                .slice(0, 5);

            const tagsSet = new Set(tags);

            res.json(Array.from(tagsSet));
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Не удалось получить теги',
            });
        }
    }

    async getAll(req, res) {
        try {
            const { limit, page } = req.query;

            let offset = limit * page - limit;
            const count = await PostModel.countDocuments({});

            const posts = await PostModel.find()
                .populate('user')
                .skip(offset)
                .limit(limit)
                .sort('-updatedAt')
                .exec();

            res.json({ posts, count });
        } catch (error) {
            console.log(error);
            res.status(500).json({
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
            )
                .populate('user')
                .exec();

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
            const tags = req.body.tags.split(', ');

            const doc = new PostModel({
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags,
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
                res.status(500).json({ message: 'Статья не найдена' });
            }

            res.json({ success: true, post });
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
