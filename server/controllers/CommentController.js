import CommentModel from "../models/Comment.js";

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

      const newComment = await (await doc.save()).populate("user");

      res.send(newComment);
    } catch (error) {
      res.status(500).json({
        message: "Не удалось создать комментарий",
      });
    }
  }

  async getCommentByPostId(req, res) {
    try {
      const { id } = req.query;

      const comments = await CommentModel.find({ post: id }).populate("user");

      res.send(comments);
    } catch (error) {
      res.status(500).json({
        message: "Не удалось получить комментарии",
      });
      console.log(error);
    }
  }

  async getUserComments(req, res) {
    try {
      const { id } = req.params;

      const userComments = await CommentModel.find({
        user: { _id: id },
      });

      res.send(userComments);
    } catch (error) {
      res.staus(500).json({
        message: "Не удалось получить комментарии пользователя",
      });
      console.log(error);
    }
  }
}

export default new CommentController();
