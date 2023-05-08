import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    avatarUrl: String,
    theme: String,
    birthday: String,
    city: String,
    education: String,
    familyStatus: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
