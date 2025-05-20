import express from "express";
import bodyParser from "body-parser";
import usersRouter from "./routes/users.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/api/v1/users", usersRouter);

app.get("/", (req, res) => {
    res.render("dashboard", { totalUsers: 10 });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));