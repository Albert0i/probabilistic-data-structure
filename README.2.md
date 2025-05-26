### Probabilistic Data Structure (Part 2/3)
> "Such ignorance can’t be put right all at once, perhaps not at all, but there can be a good deal of improvement if you will only believe some of what I say, and keep in mind your ignorance all the time."<br />The Castle by Franz Kafka


#### Prologue
Previously, my slogan was "When in doubt, ask Google.", now it is "When in doubt, ask AI". However, AI tends to give answers which you want to hear, they never say NO by retorting your proposal with: 
- This is so stupid! I mean YOUR idea... idiot! 
- You are so wrong! NEVER do it again... 
- ONLY imbecile will ask such a question!
- Oh! how moronic you are to raise SUCH a question? 
- How many times I told you! It just WON'T work..

AI is your assistant, not your friend. A good friend always helps by warning you beforehand, not just bestowing consolation when your are stranded. AI is a kind of [yes-man](https://dictionary.cambridge.org/dictionary/english-chinese-traditional/yes-man), the only reason is to make you addict to it, hanging around with it. Drifting in strong current, holding the rudder tight to keep the right direction is no easy way... They will continuously drag you astray and until you lost. 

Instead of making this code more real, I am going to make it more fun... To be honest... Around 90% of code is written by AI, 9% borrows from [here](https://github.com/redis-developer/finding-bigfoot-with-semantic-search) and the last 1% is written by myself. 


#### II. System Design
> *Probabilistic data structures* give approximations of statistics such as counts, frequencies, and rankings rather than precise values. The advantage of using approximations is that they are adequate for many common purposes but are much more efficient to calculate. They sometimes have other advantages too, such as obfuscating times, locations, and other sensitive data.

Typical usage is real-time checking for large dataset, 7 billions for example. We are goint to handle a flow of continuous `users` data, for example:
```
{
  id: '01JVY30JE6CFXD09B65HX0MH4H',
  fullname: 'Bill Pfeffer',
  email: 'Queen.Hauck58@hotmail.com',
  birthdate: 20011208,
  gender: 'female',
  phone: '15-322746-667094-4',
  createdAt: '2024-08-16T00:51:31.437Z'
}
```

To prevent flooding, fast data ingestion is highly recommended. 

> A Redis stream is a data structure that acts like an append-only log but also implements several operations to overcome some of the limits of a typical append-only log. These include random access in O(1) time and complex consumption strategies, such as consumer groups. You can use streams to record and simultaneously syndicate events in real time. 

Put it simple, in Redis Stream terminology, a producer is the process to add data; a consumer is the process to read from stream and process them. Using stream in system design effectively decouples both ends and make application scalable. Our server exposes two pages which is home page and page to add a user: 
- http://localhost:3000/
- http://localhost:3000/user/adduser

And three API endpoints, which provides statistic, add a user and email checking:  
- http://localhost:3000/api/v1/stats 
- http://localhost:3000/api/v1/add
- http://localhost:3000/api/v1/emailcheck 


#### III. [Great Expectations](https://youtu.be/QN6hchvzwjA)
Software developers are not mathematician but we need mathematics anyway... PDS, per se, are ingenious inventions but they are *fragile* somehow. To make use them effectively, you have to answer two question in the first place: 
1. What is the estimated number of values? 
2. What is the maximum error rate? 

Well, if you need 100% accuracy, I recommend you using [Set](https://redis.io/docs/latest/develop/data-types/sets/) for cardinality ([SCARD](https://redis.io/docs/latest/commands/scard/) is O(1)) and membership ([SISMEMBER](https://redis.io/docs/latest/commands/sismember/) is O(1)); [Sorted Set](https://redis.io/docs/latest/develop/data-types/sorted-sets/) for ranking ([ZRANGE](https://redis.io/docs/latest/commands/zrange/) is O(log(N)+M) with N being the number of elements in the sorted set and M the number of elements returned.). The only concern is that they are *deterministic* and will grow in size. 

[HyperLogLog](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/) in redis can be used right away, no privision is required. 

> The Redis HyperLogLog implementation uses up to 12 KB and provides a standard error of 0.81%.

> The HyperLogLog can estimate the cardinality of sets with up to 18,446,744,073,709,551,616 (2^64) members.

So, without further ado, let's pen down the questions and ask your favourite AI agents... in a couple of seconds, the answer is back. 

[Bloom filter](https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/)

Given the requirement to handle 1,000,000 values and achieve an error rate of 0.000001, the optimal parameters for `BF.RESERVE` are:
- Capacity: 1,000,000
- Error Rate: 0.000001
- Number of hash functions (k): 20
- Size of the Bloom filter (m): 28,755,172 bits (approximately 3.43 MB)

Let's check the result: 
```
> BF.RESERVE PDS:demo:users:email 0.000001 1000000
"OK"

> BF.INFO PDS:demo:users:email 
1) "Capacity"
2) "1000000"
3) "Size"
4) "3774832"  <---  3.60 MB
5) "Number of filters"
6) "1"
7) "Number of items inserted"
8) "0"
9) "Expansion rate"
10) "2"

> MEMORY USAGE PDS:demo:users:email
(integer) 3774880  <---  3.60 MB
```

[Top-K](https://redis.io/docs/latest/develop/data-types/probabilistic/top-k/)

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

Let's check the result again: 
```
> TOPK.RESERVE PDS:demo:users:list 100 10000 12 0.9999
"OK"

> TOPK.INFO PDS:demo:users:list 
1) "k"
2) "100"
3) "width"
4) "10000"
5) "depth"
6) "12"
7) "decay"
8) "0.9999"

> MEMORY USAGE PDS:demo:users:list
(integer) 964536  <--- 0.92 MB
```


#### IV. Producer 


#### V. Consumer and consumer group 


[Continue to Part 3](README.3.md)

#### VI. Bibliography 
1. [Redis Streams](https://redis.io/docs/latest/develop/data-types/streams/)
2. []()
3. []()
4. []()
5. []()
6. []()
7. []()
8. []()
9. []()
10. [The Castle by Franz Kafka](https://files.libcom.org/files/Franz%20Kafka-The%20Castle%20(Oxford%20World's%20Classics)%20(2009).pdf)


#### Epilogue
Q: **Enough is enough!** I am a software developer NOT mathematician... What *the dickens* have to learn the inner workings of PDS? 

A: Things never go smooth in life, my son. Even a little drizzle can save many grains. Chances are these trivial widgets may of great help in your future career, who knows? 


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