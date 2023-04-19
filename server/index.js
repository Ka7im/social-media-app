import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidator, loginValidation } from './validations/auth.js';
import { checkAuth, handleValidationErrors } from './middleware/index.js';
import {
    UserController,
    PostController,
    MessageController,
    CommentController,
} from './controllers/index.js';
import { postCreateValidation } from './validations/post.js';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';

const wss = new WebSocketServer(
    {
        port: 5001,
    },
    () => console.log(`Server started on 5001`)
);

function checkAuthWS(token) {
    if (!token) return;

    const decoded = jwt.verify(token, 'secret123');
    return decoded._id;
}

wss.on('connection', function connnection(ws) {
    ws.on('message', async function (message) {
        try {
            message = JSON.parse(message);

            try {
                ws.id = checkAuthWS(message.token);
            } catch (error) {
                ws.close(403);
            }

            switch (message.event) {
                case 'private-connection':
                    break;
                case 'private-message':
                    const newMessage = await MessageController.create({
                        message: message.message,
                        from: ws.id,
                        to: message.to,
                        imageUrl: message?.imageUrl,
                    });

                    privateMessage(newMessage, ws.id, message.to);
                    break;
                case 'message':
                    broadcastMessage(message);
                    break;
            }
        } catch (error) {
            ws.close();
            throw new Error(error.message);
        }
    });
});

function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}

function privateMessage(message, from, to) {
    wss.clients.forEach((client) => {
        if (client.id === to || client.id === from) {
            client.send(JSON.stringify(message));
        }
    });
}

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
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/search', UserController.getUser);

app.get('/message', checkAuth, MessageController.getAll);

app.get('/dialogs', checkAuth, MessageController.getDialogs);

app.post('/message', checkAuth, MessageController.newMessage);

app.get('/comments', checkAuth, CommentController.getCommentById);

app.post('/comments', checkAuth, CommentController.create);

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
app.get('/tags', PostController.getLastTags);
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
