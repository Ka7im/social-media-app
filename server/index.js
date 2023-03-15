import express from 'express';
import mongoose from 'mongoose';
import { registerValidator, loginValidation } from './validations/auth.js';
import checkAuth from './middleware/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import PostController from './controllers/PostController.js';
import { postCreateValidation } from './validations/post.js';

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

app.post('/auth/login', loginValidation, UserController.login);

app.post('/auth/register', registerValidator, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});
