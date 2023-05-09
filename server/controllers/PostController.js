import PostModel from "../models/Post.js";
import CommentModel from "../models/Comment.js";
import UserModel from "../models/User.js";

class PostController {
  async getLastTags(req, res) {
    try {
      const { userId } = req;
      const { friends } = await UserModel.findOne({ _id: userId });

      const posts = await PostModel.find({
        user: { $in: friends },
      })
        .limit(5)
        .sort("-createdAt")
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
        message: "Не удалось получить теги",
      });
    }
  }

  async getAll(req, res) {
    try {
      const { limit, page, tag } = req.query;
      const { userId } = req;

      let offset = limit * page - limit;

      const { friends } = await UserModel.findOne({ _id: userId });

      const count = await PostModel.countDocuments({
        user: { $in: friends },
      });

      let posts;

      if (!tag) {
        posts = await PostModel.find({
          user: {
            $in: friends,
          },
        })
          .populate("user")
          .skip(offset)
          .limit(limit)
          .sort("-createdAt")
          .exec();
      } else {
        posts = await PostModel.find({
          tags: { $in: tag },
          user: {
            $in: friends,
          },
        })
          .populate("user")
          .skip(offset)
          .limit(limit)
          .sort("-createdAt")
          .exec();
      }

      let isNewPage;

      if (page != "1") {
        isNewPage = true;
      } else {
        isNewPage = false;
      }

      res.json({ posts, count, isNewPage });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось получить статьи",
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
          returnDocument: "after",
        }
      )
        .populate("user")
        .exec();

      if (!updatedPost) {
        return res.status(404).json({ message: "Статья не найдена" });
      }

      res.json(updatedPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось получить статью",
      });
    }
  }

  async getUserPosts(req, res) {
    try {
      const { userId } = req.query;

      const posts = await PostModel.find({ user: userId })
        .populate("user")
        .sort("-createdAt");

      res.send(posts);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Не удалось получить статьи",
      });
    }
  }

  async create(req, res) {
    try {
      const tags = req.body.tags.split(", ");

      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags,
        user: req.userId,
      });

      const post = await (await doc.save()).populate("user");
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось создать статью",
      });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;

      const post = await PostModel.findByIdAndDelete({ _id: id });

      await CommentModel.deleteMany({ post: id });

      if (!post) {
        res.status(500).json({ message: "Статья не найдена" });
      }

      res.json({ success: true, post });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось удалить статью" });
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
        res.status(500).json({ message: "Статья не найдена" });
      }

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось обновить статью" });
    }
  }

  async like(req, res) {
    try {
      const { postId } = req.body;
      const { userId } = req;

      const post = await PostModel.findByIdAndUpdate(
        postId,
        {
          $addToSet: {
            likes: [userId],
          },
        },
        { new: true }
      );

      const postLikes = post._doc.likes;

      res.send(postLikes);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Не удалось поставить лайк статье" });
    }
  }

  async unlike(req, res) {
    try {
      const { postId } = req.body;
      const { userId } = req;

      const post = await PostModel.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
      );

      const postLikes = post._doc.likes;

      res.send(postLikes);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Не удалось убрать лайк со статьи" });
    }
  }
}

export default new PostController();
