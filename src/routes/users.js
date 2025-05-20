import express from "express";
import crypto from "crypto";

const router = express.Router();
let users = []; // Simulated database

// Serve the Add User Form
router.get("/adduser", (req, res) => {
    res.render("adduser");
});

// Handle User Submission
router.post("/add", (req, res) => {
    const { fullname, email, password, birthdate, sex, phone } = req.body;

    if (!fullname || !email || !password || !birthdate || !sex || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = {
        id: crypto.randomUUID(),
        fullname,
        email,
        password,
        birthdate,
        sex,
        phone,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    res.redirect("/"); // Redirect to the dashboard after adding
});

router.get("/stats", (req, res) => {
    res.json({ totalUsers: users.length });
});

export default router;