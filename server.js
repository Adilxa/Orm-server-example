import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import wsConnection from "./middlewares/ws.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
const wss = new WebSocketServer({ port: 8000 });

dotenv.config();

app.get("/", (req, res) => {
  return res.send("Hello wrodl");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  wsConnection(wss);
  next();
});

app.use(routes);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
