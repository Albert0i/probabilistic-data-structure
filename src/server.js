import express from "express";
import bodyParser from "body-parser";
import usersRouter from "./routes/users.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json()); // ✅ Allow JSON data in API requests
app.use(express.urlencoded({ extended: true })); // ✅ Support form data

app.use(express.static(path.join(__dirname, "src/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/api/v1/user", usersRouter);

// Serve the Add User Form
app.get("/user/adduser", (req, res) => {
    res.render("adduser");
});

// Home page / dashboard 
app.get("/", (req, res) => {
    res.render("dashboard", { totalUsers: 10 });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));