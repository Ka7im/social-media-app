import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidator, loginValidation } from './validations/auth.js';
import { checkAuth, handleValidationErrors } from './middleware/index.js';
import { UserController, PostController } from './controllers/index.js';
import { postCreateValidation } from './validations/post.js';

mongoose
    .connect('mongodb://localhost:27017/social-media-app')
    .then(() => {
        console.log('DB OK');
    })
    .catch((e) => console.log('DB Error', e));

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
        file: req.file,
    });
});

app.post(
    '/auth/login',
    loginValidation,
    handleValidationErrors,
    UserController.login
);

app.post(
    '/auth/register',
    registerValidator,
    handleValidationErrors,
    UserController.register
);

app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
    '/posts',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
    '/posts/:id',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.update
);

app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});
