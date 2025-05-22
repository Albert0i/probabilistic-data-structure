import express from "express";
import { ulid } from 'ulid'
import { redis } from '../redis/redis.js'
import { streamKey, hyperLogLogKey, bloomFilterKey, topKKey } from '../config.js'

const router = express.Router();

// Handle Add User Submission
router.post("/add", async (req, res) => {
    try {
        const messageId = await redis.xAdd(streamKey, '*', 
                { id: ulid(), ...req.body, createdAt: new Date().toISOString()} );        
        res.status(201).json({ success: true, id: messageId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Handle User Statistics
router.get("/stats", async (req, res) => {
    const results = await Promise.all([
            redis.sendCommand(['PFCOUNT', hyperLogLogKey]),
            redis.sendCommand(['TOPK.LIST', topKKey, 'WITHCOUNT']),
      ]);   
    res.json({ results });
});

// Handle User Email Check
router.post("/emailcheck", async (req, res) => {
    const taken = await redis.sendCommand(['BF.EXISTS', bloomFilterKey, req.body.email])
    res.json({ taken });
});

export default router;