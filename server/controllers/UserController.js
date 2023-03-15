import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { email, fullName, avatarUrl } = req.body;
        const p = req.body.password;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(p, salt);

        const doc = new UserModel({
            email,
            fullName,
            avatarUrl,
            password: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { password, ...userData } = user._doc;

        res.json({ token, ...userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Не удалось зарегистрироваться' });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.password
        );

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { password, ...userData } = user._doc;

        res.json({ token, ...userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Не удалось авторизоваться' });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.userId });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { password, ...userData } = user._doc;

        res.json({ ...userData });
    } catch (error) {
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};