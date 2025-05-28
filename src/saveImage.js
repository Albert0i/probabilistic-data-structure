import fs from 'fs';
import { redis } from './redis/redis.js'

await redis.connect();
const saveImage = async (imagePath, key) => {
  try {
    const imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
    await redis.set(key, imageData);
    console.log('Image saved successfully!');
  } catch (error) {
    console.error('Error saving image:', error);
  }
};

// Example Usage
await saveImage('./img/f91_end.png', 'myImage');
await redis.close();
