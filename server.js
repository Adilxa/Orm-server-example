import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.send("Hello wrodl");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
