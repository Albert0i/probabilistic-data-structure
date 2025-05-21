import express from "express";
import { ulid } from 'ulid'
import { redis } from '../redis/redis.js'
import { streamKey, cardinalityKey, topKKey } from '../config.js'

const router = express.Router();

// Handle Add User Submission
router.post("/add", async (req, res) => {
    await redis.connect()
    try {
        const messageId = await redis.xAdd(streamKey, '*', 
                { id: ulid(), ...req.body, createdAt: new Date().toISOString()} );
        res.status(201).json({ success: true, id: messageId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Handle User Statistic 
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