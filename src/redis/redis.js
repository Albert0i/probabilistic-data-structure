import 'dotenv/config'
import { createClient } from 'redis'

const redis = createClient({ 
        socket: {
            port: process.env.REDIS_PORT,       // Redis port
            host: process.env.REDIS_HOST,       // Redis host            
        }, 
        password: process.env.REDIS_PASSWORD,   // Redis password 
    })

redis.on('error', (err) => console.log('Redis Client Error', err));

export { redis }

/*
   node-redis
   https://www.npmjs.com/package/redis
*/