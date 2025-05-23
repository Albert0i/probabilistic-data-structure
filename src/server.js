import express from "express";
import usersRouter from "./routes/users.js";
import path from "path";
import { fileURLToPath } from "url";
import { redis } from './redis/redis.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json()); // ✅ Allow JSON data in API requests
app.use(express.urlencoded({ extended: true })); // ✅ Support form data

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/api/v1/user", usersRouter);

// Add User Form
app.get("/user/adduser", (req, res) => {
    res.render("adduser");
});

// Home page / dashboard 
app.get("/", (req, res) => {
    res.render("dashboard", { totalUsers: 10 });
});

await redis.connect()

// Handle Ctrl+C (SIGINT) event
process.on("SIGINT", async () => {
    console.log("Received SIGINT. Closing redis connection...");
    await redis.close();
    process.exit(0); // Exit the process
});

// Start Express server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

/*
   Favicon Generators
   https://favicon.io/
*/