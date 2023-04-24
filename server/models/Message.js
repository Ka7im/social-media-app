import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
    {
        message: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        audioUrl: {
            type: String,
        },
        videoUrl: {
            type: String,
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Message', MessageSchema);
