
export const maxUsers = 100000      // Capped streams
export const incrementSize = 1000
export const streamKey = 'PDS:demo:users:stream';   // User streams 
export const consumerGroupName1 = 'PDS:demo:users:group:1';
export const consumerGroupName2 = 'PDS:demo:users:group:2';

export const hyperLogLogKey = 'PDS:demo:users:card';
export const bloomFilterKey = 'PDS:demo:users:email';
export const topKKey = 'PDS:demo:users:list';
export const blockForTime = 5 * 1000;       // Five seconds 
export const consumerIdleTime = 60 * 1000;  // 1 minutes 

/*
    Bloom filter
    Given the requirement to handle 1,000,000 values and achieve an error rate of 0.001%, the optimal parameters for BF.RESERVE are:
    - Error Rate: 0.00001
    - Capacity: 1,000,000
    - Number of hash functions (k): 20
    - Size of the Bloom filter (m): 28,755,172 bits (approximately 3.43 MB)
    
    BF.RESERVE PDS:demo:users:email 0.00001 1000000


    Top-K
    Given the requirement to handle 1,000,000 values and achieve an error rate of 0.001%, the recommended parameters are:
    - Width: 10000
    - Depth: 12
    - Decay: 0.9999
    
    The approximate memory consumption with these parameters is:
    - MinHeap Memory: 2400 bytes
    - HeavyKeeper Memory: 960000 bytes
    - Total Memory: 962400 bytes (approximately 0.92 MB)

    TOPK.RESERVE PDS:demo:users:list 100 10000 12 0.9999
*/
/*
    > MEMORY USAGE PDS:demo:users:email
    (integer) 3175816 <-- 3.02 MB

    > MEMORY USAGE PDS:demo:users:list
    (integer) 964536 <-- 0.92 MB
*/
/*
    > BF.INFO PDS:demo:users:email 
    1) "Capacity"
    2) "1000000"
    3) "Size"
    4) "3175768"
    5) "Number of filters"
    6) "1"
    7) "Number of items inserted"
    8) "0"
    9) "Expansion rate"
    10) "2"

    > TOPK.INFO PDS:demo:users:list 
    1) "k"
    2) "100"
    3) "width"
    4) "10000"
    5) "depth"
    6) "12"
    7) "decay"
    8) "0.9999"
*/