
export const maxSize = 100000      // Capped
export const incrementSize = 100
export const streamKey = 'PDS:demo:users:stream';   // Users streams 
export const consumerGroupName = 'PDS:demo:users:group';
export const numberOfStreams = 4

export const cardinalityKey = 'PDS:demo:users:card';
export const topKKey = 'PDS:demo:users:freq'
export const blockForTime = 5 * 1000;       // Five seconds 
export const consumerIdleTime = 60 * 1000;  // 1 minutes 
