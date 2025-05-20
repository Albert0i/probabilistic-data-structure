import express from "express";
import crypto from "crypto";
import { redis } from '../redis/redis.js'
import { cardinalityKey, topKKey } from '../config.js'

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

router.get("/stats", async (req, res) => {
    await redis.connect()
    const results = await Promise.all([
            redis.sendCommand(['PFCOUNT', cardinalityKey]),
            redis.sendCommand(['TOPK.LIST', topKKey, 'WITHCOUNT']),
      ]);   
    await redis.close();    
    res.json({ results });    
});

export default router;