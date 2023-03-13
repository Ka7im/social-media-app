import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidator } from './validations/auth.js';

import UserModel from './models/User.js';

mongoose
    .connect('mongodb://localhost:27017/social-media-app')
    .then(() => {
        console.log('DB OK');
    })
    .catch((e) => console.log('DB Error', e));

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/auth/register', registerValidator, async (req, res) => {
    const { email, fullName, avatarUrl, passwordHash } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(passwordHash, salt);

    const doc = new UserModel({
        email,
        fullName,
        avatarUrl,
        passwordHash: password,
    });

    const user = await doc.save();

    res.json(user);
});

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});
