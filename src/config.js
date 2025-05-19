
export const maxUsers = 100000      // Capped streams
export const incrementSize = 1000
export const streamKey = 'PDS:demo:users:stream';   // User streams 
export const consumerGroupName = 'PDS:demo:users:consumerGroup';

export const cardinalityKey = 'PDS:demo:users:card';
export const topKKey = 'PDS:demo:users:freq'
export const blockForTime = 5 * 1000;       // Five seconds 
export const consumerIdleTime = 60 * 1000;  // 1 minutes 

// export const trackingKey = 'PDS:demo:users:lastId';      // last processed id
// export const trackingCount = 'PDS:demo:users:lastCount'; // last processed count
// export const cardinalityKey = 'PDS:demo:users:card';     // cardinality     
// export const topKKey = 'PDS:demo:users:freq'           // top 100 
