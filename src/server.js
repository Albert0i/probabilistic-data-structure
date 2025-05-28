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

// Show custom image 
// app.get('/image', async (req, res) => {
//     try {
//       const imageData = await redis.get('myImage');
//       if (!imageData) return res.status(404).send('Image not found');
  
//       res.setHeader('Content-Type', 'image/jpeg');
//       res.send(Buffer.from(imageData, 'base64'));
//     } catch (error) {
//       res.status(500).send('Error retrieving image');
//     }
//   });
app.get('/image', async (req, res) => {
    try {
        const imageData = await redis.get('myImage');
        res.render('image', { imageData }); // Send Base64 to EJS template
    } catch (error) {
        res.status(500).send('Error retrieving image');
    }
});

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