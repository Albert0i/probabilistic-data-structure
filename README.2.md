### Probabilistic Data Structure (Part 2/3)

#### Prologue
**Enough is enough!** I am a software developer NOT mathematician... What *the dickens* to learn the inner workings of PDS? Things never go smooth in life, my son. Even a little drizzle can save many grains. Chances are these trivial techniques may of great help in your future career, who knows? 

Insteas of making this project more real, I decided to make it more fun... To be honest... Around 90% of code is written by AI, 9% borrows from [here](https://github.com/redis-developer/finding-bigfoot-with-semantic-search) and the last 1% is written by myself. 


#### I. Project setup 

#### I. [Great Expectations](https://youtu.be/QN6hchvzwjA)
[HyperLogLog](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/)
> The Redis HyperLogLog implementation uses up to 12 KB and provides a standard error of 0.81%.

> The HyperLogLog can estimate the cardinality of sets with up to 18,446,744,073,709,551,616 (2^64) members.

Bloom filter
Given the requirement to handle 1,000,000 values and achieve an error rate of 0.000001, the optimal parameters for `BF.RESERVE` are:
- Error Rate: 0.000001
- Capacity: 1,000,000
- Number of hash functions (k): 20
- Size of the Bloom filter (m): 28,755,172 bits (approximately 3.43 MB)
```
BF.RESERVE PDS:demo:users:email 0.000001 1000000
```

Top-K
Given the requirement to handle 1,000,000 values and achieve an error rate of 0.000001, the optimal parameters for `TOPK.RESERVE` are:
- K: 100
- Width: 10000
- Depth: 12
- Decay: 0.9999

The approximate memory consumption with these parameters is:
- MinHeap Memory: 2400 bytes
- HeavyKeeper Memory: 960000 bytes
- Total Memory: 962400 bytes
- Total Memory in MB: 0.9178 MB
```
TOPK.RESERVE PDS:demo:users:list 100 10000 12 0.9999
```





Error Rate: 0.000001
Capacity: 1,000,000
Number of hash functions (k): 20
Size of the Bloom filter (m): 28,755,172 bits (approximately 3.43 MB)


/*
    Bloom filter
    Given the requirement to handle 1,000,000 values and achieve an error rate of 0.000001, the optimal parameters for TOPK.RESERVE and memory usage in MB: 
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

#### II. 

#### III. 

#### IV. 

#### V.

#### VI.

[Continue to Part 3](README.3.md)

#### VII. Bibliography 

#### Epilogue

### EOF (2025/05/30)

When to Use Redis as a Primary Database - Redis Special Topics (1/4) | System Design
https://youtu.be/BJxtLbE5sxw

Using Redis Streams instead of Kafka - Redis Special Topics (2/4) | System Design
https://youtu.be/zcCEFByssQU

I replaced my Redis cache with Postgres... Here's what happened
https://youtu.be/KWaShWxJzxQ

Count-Min Sketch: An efficient probabilistic Data Structure by Raphael De Lio
https://youtu.be/KRaSkSzwCkE

ClueCon Weekly with Guy Royse [Ep. 31]
https://youtu.be/lIMK2Mi5e40

ClueCon Weekly with Guy Royse pt. 2 [Ep. 34]
https://youtu.be/3o-xcgtf_XU