import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import { MessageController } from "./controllers/index.js";
import cors from "cors";
import { WebSocketServer } from "ws";
import { checkAuthWS } from "./utils/chechAuthWS.js";
import { privateMessage } from "./utils/privateMessage.js";
import routes from "./routes/index.js";

dotenv.config();

const wss = new WebSocketServer(
  {
    port: process.env.WS_PORT || 5001,
  },
  () => console.log(`WS Server started on ${process.env.WS_PORT}`)
);

wss.on("connection", function connection(ws) {
  ws.on("message", async function (message) {
    try {
      message = JSON.parse(message);

      try {
        ws.id = checkAuthWS(message.token);
      } catch (error) {
        ws.close(403);
      }

      switch (message.event) {
        case "private-connection":
          break;
        case "private-message":
          const newMessage = await MessageController.create({
            videoUrl: message.videoUrl,
            audioUrl: message.audioUrl,
            message: message.message,
            from: ws.id,
            to: message.to,
            imageUrl: message?.imageUrl,
          });

          privateMessage(newMessage, ws.id, message.to, wss);
          break;
      }
    } catch (error) {
      ws.close();
      throw new Error(error.message);
    }
  });
});

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("", routes);
app.use("/uploads", express.static("uploads"));
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    url: `/${req.file.path.replace(/\\/g, "/")}`,
  });
});

const PORT = process.env.PORT || 5000;
const databaseConnection = process.env.DB_CONNECTION;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  mongoose
    .connect(databaseConnection)
    .then(() => {
      console.log("DB OK");
    })
    .catch((e) => console.log("DB Error", e));

  console.log("Server OK");
});
