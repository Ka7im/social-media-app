import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

class UserController {
  register = async (req, res) => {
    try {
      const { email, fullName, avatarUrl } = req.body;
      const p = req.body.password;

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(p, salt);

      const doc = new UserModel({
        email,
        fullName,
        avatarUrl,
        password: hash,
        theme: "light",
      });

      const user = await doc.save();

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );

      const { password, ...userData } = user._doc;

      res.json({ token, ...userData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось зарегистрироваться" });
    }
  };

  login = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      const isValidPass = await bcrypt.compare(
        req.body.password,
        user._doc.password
      );

      if (!isValidPass) {
        return res.status(400).json({
          message: "Неверный логин или пароль",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        {
          expiresIn: "30d",
        }
      );

      const { password, ...userData } = user._doc;

      res.json({ token, ...userData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось авторизоваться" });
    }
  };

  async getUserById(req, res) {
    try {
      const { id } = req.query;

      let user;

      if (!id) {
        user = await UserModel.findOne({ _id: req.userId });
      } else {
        user = await UserModel.findOne({ _id: id });
      }

      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      const { password, ...userData } = user._doc;

      res.json({ ...userData });
    } catch (error) {
      res.status(500).json({
        message: "Нет доступа",
      });
    }
  }

  async getUserByName(req, res) {
    const { fullName } = req.query;

    const users = await UserModel.find({ fullName: { $regex: fullName } });

    const userWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user._doc;
      return userWithoutPassword;
    });

    res.send(userWithoutPassword);
  }

  async toggleTheme(req, res) {
    const { theme } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      {
        _id: req.userId,
      },
      {
        theme,
      },
      {
        returnDocument: "after",
      }
    );

    res.send(user.theme);
  }

  async updateUserInfo(req, res) {
    try {
      const { id, birthday, city, education, familyStatus, avatarUrl } =
        req.body;

      const { userId } = req;

      if (userId !== id) {
        throw new Error("Можно изменять только свои данные");
      }

      const user = await UserModel.findByIdAndUpdate(
        id,
        {
          avatarUrl,
          birthday,
          city,
          education,
          familyStatus,
        },
        { new: true }
      );

      const { password, ...updatedUser } = user._doc;

      res.send(updatedUser);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Не получилось обновить данные пользователя",
      });
    }
  }

  async getFriends(req, res) {
    try {
      const { userId } = req;

      const user = await UserModel.findById(userId).populate("friends");

      const { password, ...userData } = user._doc;

      const friendsWithoutPassword = userData.friends.map((friend) => {
        const { password, ...friendWithoutPassword } = friend;

        return friendWithoutPassword._doc;
      });

      res.send(friendsWithoutPassword);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Не удалось получить друзей пользователя",
      });
    }
  }

  async addFriend(req, res) {
    try {
      const { friendId } = req.body;
      const { userId } = req;

      if (friendId === userId) {
        throw new Error("Нельзя добавить самого пользователя к себе в друзья");
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: [friendId] } },
        { new: true }
      ).populate("friends");

      const { password, ...userData } = updatedUser._doc;

      const friendsWithoutPassword = userData.friends.map((friend) => {
        const { password, ...friendWithoutPassword } = friend;

        return friendWithoutPassword._doc;
      });

      res.send(friendsWithoutPassword);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Не получилось добавить пользователя в друзья",
      });
    }
  }

  async removeFriend(req, res) {
    try {
      const { friendId } = req.query;
      const { userId } = req;

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { new: true }
      ).populate("friends");

      const { password, ...userData } = updatedUser._doc;

      const friendsWithoutPassword = userData.friends.map((friend) => {
        const { password, ...friendWithoutPassword } = friend;

        return friendWithoutPassword._doc;
      });

      res.send(friendsWithoutPassword);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Не получилось удалить пользователя из друзей",
      });
    }
  }
}

export default new UserController();
