
export const maxUsers = 100000      // Capped streams
export const incrementSize = 1000
export const streamKey = 'PDS:demo:users:stream';   // User streams 
export const consumerGroupName1 = 'PDS:demo:users:group:1';
export const consumerGroupName2 = 'PDS:demo:users:group:2';

export const cardinalityKey = 'PDS:demo:users:card';
export const topKKey = 'PDS:demo:users:freq'
export const blockForTime = 5 * 1000;       // Five seconds 
export const consumerIdleTime = 60 * 1000;  // 1 minutes 
