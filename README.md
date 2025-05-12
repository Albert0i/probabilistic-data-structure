### Probabilistic Data Structure

> "'correct understanding of a matter and a misunderstanding of the same matter are not mutually exclusive'."<br />The Trial by Franz Kafka


#### Prologue
In the year of 2025, everybody is talking and doing AI things... Probabilistic Data Structure, or PDS for short, doesn't have direct bearing on AI but more to do with data analytic issue. If records to be processed are thousands then any RDBMS will do. If records to be processed are billions or trillions and you are more concerned with speed and size rather than accuracy, PDS is an obvios choice. 

AI is the thing helps to improve efficiency but quality depends, HE drives you away and astray after all. AI is crafted by human and I don't believe in human, that's why I don't believe in AI. 


#### I. Deterministic vs. Probabilistic 
![alt two-families-of-data-structures](img/two-families-of-data-structures.JPG)
Most people of my era have read the book [Algorithms and Data Structures by Niklaus Wirth 1985)](https://informatika-21.ru/pdf/AD.pdf). Data structures are simply *organized* data working in a specific way, ie. array, list, stack. queue and tree are *canonical* data structures to be taught in university, so to speak. But there are also hash, collection, bag, dictionary and many more... 

All of them shares common characteristics: 
- Resides in memory; 
- Memory consumption is proportional to number of elements; 
- No matter the order of data, it always works as expected; 
- Subject to different levels of [Time complexity](https://en.wikipedia.org/wiki/Time_complexity). 

Within organized data of any form, there are three kinds of problem: 
- Cardinality: count number of unique elements; 
- Membership: test if a specific element exists; 
- Frequency: how many times an element appears;

It is easy to handle with a table in MariaDB, for example: 
```
use test; 
CREATE TABLE t (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value TEXT
);

CREATE INDEX idx_value ON t(value(255)); -- Non-unique index on first 255 characters of the 'value' field
```

After inserting sample data from `t.sql`: 
```
-- Cardinality 
SELECT COUNT(*) as card 
FROM (SELECT DISTINCT value FROM t) t1; 

99

-- Membership 
SELECT EXISTS(SELECT 1 FROM t WHERE value = 'David') AS exists_check;

1 

SELECT EXISTS(SELECT 1 FROM t WHERE value = 'Leni') AS exists_check;

0

-- Frequency 
SELECT COUNT(*) as freq FROM t WHERE value='David'; 

3

SELECT COUNT(*) as freq FROM t WHERE value='David'; 

0
```

Easy-peasy! As you can see, we use a single data structure, ie. table, to address three problems. Owning to [ACID](https://en.wikipedia.org/wiki/ACID) nature, RDBMS stores data on disk and by dint of index, it just know where to pull out data to make aggregations. 
![alt cardinality](img/t.card.JPG)
![alt membership](img/t.member.JPG)
![alt frequency](img/t.freq.JPG)

We have 127 records and data size is 0.03MB which is ≈ 30.72KB. 
![alt data size](img/t.data-size.JPG)

When scaling up to billions, aggregating in real time is impractical and virtually impossible. This is where PDS comes into play... 

**Caveat**

- PDS are specialized data structures to tackle *humungous* data size for specific purpose; 
- PDS trades accuracy for speed and size, you won't get 100% accuracy and have to endure false positive somehow; 
- Good estimation of elements is a **MUST** otherwise accuracy would dwindle drastically; 
---
Note: A **false positive** occurs when a test or system incorrectly identifies something as true or present when it actually isn’t. This concept is commonly used in areas like **machine learning, security, medicine, and data analysis**.


Here, I am going to demo [HyperLogLog](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/) [Bloom filter](https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/) and [Top-K](https://redis.io/docs/latest/develop/data-types/probabilistic/top-k/) one by one. 

After inserting sample data from `pf.redis`:
```
> PFCOUNT PDS:t:card 
(integer) 99

> MEMORY USAGE PDS:t:card
(integer) 440
```
--- 
Note: 

- The `MEMORY USAGE` command returns the memory usage of a key in bytes.
- This command provides an estimate of the memory consumed by the key and its associated value.
- The unit of measurement is bytes.


After inserting sample data from `bf.redis`:
```
> BF.CARD PDS:t:member
(integer) 99

> BF.EXISTS PDS:t:member 'David' 
(integer) 1

> BF.EXISTS PDS:t:member 'Leni'
(integer) 0

> BF.INFO PDS:t:member
1) "Capacity"
2) "100"
3) "Size"
4) "240"
5) "Number of filters"
6) "1"
7) "Number of items inserted"
8) "99"
9) "Expansion rate"
10) "2"

> MEMORY USAGE PDS:t:member
(integer) 280
```

After inserting sample data from `topk.redis`:
```
> TOPK.QUERY PDS:t:freq 'David'
1) "1"

> TOPK.QUERY PDS:t:freq 'Leni'
1) "0"

> TOPK.LIST PDS:t:freq WITHCOUNT
1) "Alice"
2) "5"
3) "Charlie"
4) "5"
5) "Bob"
6) "5"
7) "David"
8) "3"
9) "George"
10) "3"
. . . 
197) "Sebastian"
198) "1"

> TOPK.INFO PDS:t:freq
1) "k"
2) "100"
3) "width"
4) "8"
5) "depth"
6) "7"
7) "decay"
8) "0.9"

> MEMORY USAGE PDS:t:freq
(integer) 4976
```

As you can see, it is amazingly easy to use. PDS shares common characteristics:
- Resides in memory, they are data structures after all;
- Memory consumed is fixed and is based on estimated capacity; 
- The order of data may affect accuracy and thus the final outcome; 

| Operation | Description | Time complexity |
| ----------- | ----------- | ----------- |
| [PFADD](https://redis.io/docs/latest/commands/pfadd/) | Add elements to a HyperLogLog key. Create the key if it doesn't exist. | O(1) |
| [PFCOUNT](https://redis.io/docs/latest/commands/pfcount/) | Returns the approximated cardinality of the set(s) observed by the HyperLogLog key(s). | O(1) |
| [BF.ADD](https://redis.io/docs/latest/commands/bf.add/) | Adds an item to a Bloom Filter.  | O(k), where k is the number of hash functions used by the last sub-filter |
| [BF.CARD](https://redis.io/docs/latest/commands/bf.card/) | Returns the cardinality of a Bloom Filter. | O(1) |
| [BF.EXISTS](https://redis.io/docs/latest/commands/bf.exists/) |  | O(k), where k is the number of hash functions used by the last sub-filter |
| [TOPK.ADD](https://redis.io/docs/latest/commands/topk.add/) | Increase the count of one or more items by increment. | O(n * k) where n is the number of items and k is the depth |
| [TOPK.QUERY](https://redis.io/docs/latest/commands/topk.query/) | Checks wheather one or more items are in a sketch. | O(n) where n is the number of items |
| [TOPK.LIST](https://redis.io/docs/latest/commands/topk.list/) | Returns full list of items in Top K list. | O(k*log(k)) where k is the value of top-k |

O(1) is the most favourable. Different PDS may overlap in functions, it is up to you to choose one which suits your application scenario. As a last note, after adding items to PDS, it is impossible to retrieve them back as they are hashed and forgotten. If items matter, better to equip RDBMS as a kind of data sink for further processing. 


#### II. [Bloom filter](https://redis.io/docs/latest/develop/data-types/probabilistic/bloom-filter/) 
> The **Bloom filter** is named after **Burton Howard Bloom**, the computer scientist who introduced the concept in his 1970 paper titled [*Space/Time Trade-offs in Hash Coding with Allowable Errors*](https://cs.pwr.edu.pl/cichon/2021_22_a/BigData/Bloom.pdf). Bloom devised this probabilistic data structure to efficiently test for set membership while minimizing memory usage. Interestingly, Bloom filters have inspired many variations, including **Counting Bloom Filters, Cuckoo Filters, and Partitioned Bloom Filters**, each refining the original concept for different applications. 

> The default capacity for Bloom filters is 100, and the default error rate is 0.01. For more details, you can refer to the documentation [here](https://redis.io/docs/latest/develop/data-types/probabilistic/configuration/?utm_source=redisinsight&utm_medium=app&utm_campaign=ai_assistant).

- [BF.RESERVE](https://redis.io/docs/latest/commands/bf.reserve/) in Redis is used to pre-allocate memory for a Bloom Filter. It helps to establish the initial capacity and error rate for the filter before any elements are added to it.
```
BF.RESERVE key error_rate capacity [EXPANSION expansion]
  [NONSCALING]
```
> By default, the filter auto-scales by creating additional sub-filters when capacity is reached. The new sub-filter is created with size of the previous sub-filter multiplied by expansion.

> Though the filter can scale up by creating sub-filters, it is recommended to reserve the estimated required capacity since maintaining and querying sub-filters requires additional memory (each sub-filter uses an extra bits and hash function) and consume further CPU time than an equivalent filter that had the right capacity at creation time.

> The size of the new sub-filter is the size of the last sub-filter multiplied by expansion, specified as a positive integer. If the number of items to be stored in the filter is unknown, you use an expansion of 2 or more to reduce the number of sub-filters. Otherwise, you use an expansion of 1 to reduce memory consumption. The default value is 2.

> Non-scaling filters requires slightly less memory than their scaling counterparts. The filter returns an error when capacity is reached.

Reserved with an error rate 1%, capacity 1000 and expansion factor of 2.
```
BF.RESERVE bf_exp 0.01 1000 EXPANSION 2
```
Reserved with an error rate 1%, capacity 1000 and without auto-scaling.
```
BF.RESERVE bf_non 0.01 1000 NONSCALING
```

> [BF.ADD](https://redis.io/docs/latest/commands/bf.add/) returns [] on error (invalid arguments, wrong key type, etc.) and also when the filter is full.

> [BF.INFO](https://redis.io/docs/latest/commands/bf.info/) returns information about a Bloom filter. 
```
> BF.INFO PDS:t:member
1) "Capacity"
2) "100"
3) "Size"
4) "240"
5) "Number of filters"
6) "1"
7) "Number of items inserted"
8) "99"
9) "Expansion rate"
10) "2"
```

More resource: 
- [Bloom Filter Calculator](https://hur.st/bloomfilter/)

- [Bloom Filters by Example](https://llimllib.github.io/bloomfilter-tutorial/)

- [Configuration Parameters](https://redis.io/docs/latest/develop/data-types/probabilistic/configuration/#bf-initial-size) for Bloom filter and Cuckoo filter. 

- [Probabilistic data structure commands](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/bloom/commands/) for Bloom filter, Cuckoo filter and Top-k. 


#### III. Cuckoo Filter 
![alt cuckoo-filter](img/cuckoo-filter.JPG)
> The **Cuckoo Filter**, introduced by researchers Bin Fan, David Andersen, and Michael Kaminsky in 2014 titled [Cuckoo Filter: Practically Better Than Bloom](https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf), is a **probabilistic data structure** used for approximate membership testing, much like a Bloom filter but with added flexibility.

> The naming comes from **Cuckoo Hashing**, a hashing technique where collisions are resolved by **displacing** existing entries—similar to how a cuckoo chick pushes other eggs out of the nest.

> In **Cuckoo Filters**, when an item is inserted and its designated position is occupied, the filter evicts an existing item and attempts to relocate it to another slot, just like Cuckoo Hashing.

> The default capacity for Cuckoo filters is 1024, and the default error rate is 0.01. For more information, you can refer to the documentation [here](https://redis.io/docs/latest/develop/data-types/probabilistic/cuckoo-filter/?utm_source=redisinsight&utm_medium=app&utm_campaign=ai_assistant).

- [CF.RESERVE](https://redis.io/docs/latest/commands/cf.reserve/) in Redis is used to pre-allocate memory for a Cuckoo Filter. It allows you to establish the initial capacity for the filter. 

```
CF.RESERVE key capacity [BUCKETSIZE bucketsize]
  [MAXITERATIONS maxiterations] [EXPANSION expansion]
```
> While the Bloom filter is a bit array with flipped bits at positions decided by the hash function, a Cuckoo filter is an array of buckets, storing fingerprints of the values in one of the buckets at positions decided by the two hash functions. A membership query for item x searches the possible buckets for the fingerprint of x, and returns true if an identical fingerprint is found. A cuckoo filter's fingerprint size will directly determine the false positive rate.

> `bucketsize` is an integer between 1 and 255. The default value is 2. A higher bucket size value improves the fill rate but also causes a higher error rate and slightly slower performance.

> For example, when `bucketsize` is set to 3, a maximum of 3 fingerprints can be stored in the same location. This setting allows multiple entries in a bucket, with each entry containing a unique fingerprint. This feature helps optimize the fill rate of the filter without leading to false positives and maintains efficient performance.

> `maxiterations` is an integer between 1 and 65535. The default value is 20. Number of attempts to swap items between buckets before declaring filter as full and creating an additional filter. A low value is better for performance and a higher number is better for filter fill rate.

> `expansion` is an integer between 0 and 32768. The default value is 1. When a new filter is created, its size is the size of the current filter multiplied by expansion. Expansion is rounded to the next 2^n number.

Reserved with capacity 1000,000, buckersize 2, maxiterations 20, expansion 1.
```
CF.RESERVE bikes:models 1000000 BUCKETSIZE 2
  MAXITERATIONS 20 EXPANSION 1
```

> [CF.ADD](https://redis.io/docs/latest/commands/cf.add/) returns [] on error (invalid arguments, wrong key type, etc.) and also when the filter is full. 

> Time complexity is O(n + i), where n is the number of sub-filters and i is maxIterations. Adding items requires up to 2 memory accesses per sub-filter. But as the filter fills up, both locations for an item might be full. The filter attempts to Cuckoo swap items up to maxIterations times.

[CF.EXISTS](https://redis.io/docs/latest/commands/cf.exists/), [CF.COUNT](https://redis.io/docs/latest/commands/cf.count/) and [CF.INFO](https://redis.io/docs/latest/commands/cf.info/). 

After inserting sample data from `cf.redis`:
```
> CF.EXISTS PDS:t:memdel 'David' 
(integer) 1

> CF.EXISTS PDS:t:memdel 'Leni' 
(integer) 0

> CF.COUNT PDS:t:memdel 'David' 
(integer) 3

> CF.COUNT PDS:t:memdel 'Leni'
(integer) 0

> CF.INFO PDS:t:memdel 
1) "Size"
2) "2120"
3) "Number of buckets"
4) "512"
5) "Number of filters"
6) "2"
7) "Number of items inserted"
8) "127"
9) "Number of items deleted"
10) "0"
11) "Bucket size"
12) "2"
13) "Expansion rate"
14) "1"
15) "Max iterations"
16) "20"

> memory usage PDS:t:memdel
(integer) 2160
```

> [CF.DEL](https://redis.io/docs/latest/commands/cf.del/) Deletes an item once from the filter. If the item exists only once, it will be removed from the filter. If the item was added multiple times, it will still be present. **Deleting an item that are not in the filter may delete a different item, resulting in false negatives**. 

**Caveat**

- Cuckoo Filter in Redis has far more tuning parameters then Bloom filter. `CF.ADD` is O(k + i), where k is the number of sub-filters and i is maxIterations; `CF.COUNT`, `CF.EXISTS` and `CF.DEL` are O(k), where k is the number of sub-filters. 

- `BF.ADD` and `BF.EXISTS` are O(k), where k is the number of hash functions used by the last sub-filter; `BF.CARD` is O(1).

- In a word, Cuckoo Filter can do Membership, Frequency and delete items; Bloom filter can do Cardinality, Membership but can not delete items; 
```
> MEMORY USAGE PDS:t:member
(integer) 280

> MEMORY USAGE PDS:t:memdel
(integer) 2160
```

More resource: 
- [Probabilistic Filters By Example](https://bdupras.github.io/filter-tutorial/)

- [Configuration Parameters](https://redis.io/docs/latest/develop/data-types/probabilistic/configuration/#bf-initial-size) for Bloom filter and Cuckoo filter. 

- [Probabilistic data structure commands](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/bloom/commands/) for Bloom filter, Cuckoo filter and Top-k. 


#### IV. [HyperLogLog](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/)
> The name **HyperLogLog** comes from its predecessor, the **LogLog algorithm**, which was designed for estimating the number of distinct elements in a dataset. HyperLogLog is an **enhanced version** of LogLog, hence the prefix **"Hyper"**, indicating its improved accuracy and efficiency.

> The original **LogLog algorithm** was developed based on the idea of using the maximum number of leading zeros in hashed values to estimate cardinality. HyperLogLog builds upon this by introducing **harmonic averaging** and **multiple registers**, significantly reducing estimation error while maintaining a compact memory footprint.

> HyperLogLog was introduced by **Philippe Flajolet** and his colleagues in a 2007 paper [HyperLogLog: the analysis of a near-optimal
cardinality estimation algorithm](https://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf), refining earlier probabilistic counting methods. It has since become widely used in **big data analytics, databases, and network monitoring** due to its ability to estimate large cardinalities with minimal memory usage.

> The default capacity for HyperLogLog in Redis is up to 12 KB and provides a standard error of 0.81%. For more information, you can refer to the documentation [here](https://redis.io/docs/latest/develop/data-types/probabilistic/hyperloglogs/?utm_source=redisinsight&utm_medium=app&utm_campaign=ai_assistant).

> The HyperLogLog can estimate the cardinality of sets with up to 18,446,744,073,709,551,616 (2^64) members.

[PFMERGE](https://redis.io/docs/latest/commands/pfmerge/)


#### V. [Top-K](https://redis.io/docs/latest/develop/data-types/probabilistic/top-k/)
> The default capacity for Top-K in Redis is 1000, and the default error rate is 0.01. For more details, you can refer to the documentation [here](https://redis.io/docs/latest/develop/data-types/probabilistic/top-k/?utm_source=redisinsight&utm_medium=app&utm_campaign=ai_assistant).

[TOPK.RESERVE](https://redis.io/docs/latest/commands/topk.reserve/)


#### VI. Bibliography 
1. [Probabilistic](https://redis.io/docs/latest/develop/data-types/probabilistic/)
2. [Probabilistic Data Structures - Bloom Filters, HyperLogLogs & Cuckoo Filters](https://youtu.be/dq-0xagF7v8)
3. [Understanding Probabilistic Data Structures with 112,092 UFO Sightings - Guy Royse - NDC Oslo 2023](https://youtu.be/M6XOniVANKI)
4. [Understanding Probabilistic Data Structures with UFO Sightings | Guy Royse](https://youtu.be/2Dzc7fxA0us)
5. [Intro to Probabilistic Data Structures by ANDREA IACONO](https://youtu.be/Y66Uy1he3Vo)
6. [Probabilistic data structures by Andrea Iacono](https://youtu.be/bYyRwGFSFbQ)
7. [A problem so hard even Google relies on Random Chance](https://youtu.be/lJYufx0bfpw)
8. [Counting BILLIONS with Just Kilobytes? Meet HyperLogLog!](https://youtu.be/f69hh3KgFEk)
9. [HyperLogLog: A Simple but Powerful Algorithm for Data Scientists](https://chengweihu.com/hyperloglog/)
10. [The Trial by Franz Kafka](https://www.gutenberg.org/cache/epub/7849/pg7849-images.html)


#### Epilogue
> "Finally his eyes grow dim, and he no longer knows whether it's really getting darker or just his eyes that are deceiving him. But he seems now to see an inextinguishable light begin to shine from the darkness behind the door. He doesn't have long to live now." <br />The Trial by Franz Kafka


### EOF (2025/05/30)

**The Midwich Cuckoos** is a British sci-fi drama based on John Wyndham’s classic novel. The series takes place in the quiet town of Midwich, where an unexplained phenomenon causes every resident to lose consciousness simultaneously. When they wake, all women of childbearing age discover they are mysteriously pregnant. As time passes, the children born from this event exhibit eerie intelligence, unnatural abilities, and a shared connection, leaving the town in fear of their growing power.

The show explores themes of control, survival, and human instincts, blending psychological horror with science fiction. As the children develop, tensions rise between them and the adults struggling to understand their purpose and motives. The eerie atmosphere, coupled with unsettling performances, keeps the audience on edge, questioning the true nature of these children and their origins. 

Across its seven episodes, the series delivers a gripping narrative filled with moral dilemmas, emotional conflicts, and an overarching mystery that deepens with every revelation. With a mix of suspense and thought-provoking storytelling, **The Midwich Cuckoos** offers a modern twist on Wyndham’s unsettling tale of inexplicable power and the dangers of what lies beyond human comprehension. 


Cuckoo birds are **brood parasites**, meaning they do not raise their own young. Instead, a female cuckoo lays her eggs in the nests of other bird species, tricking them into raising her chicks. She carefully chooses host birds with eggs similar in appearance to her own, ensuring the foster parents won’t detect the intruder. Often, she removes one of the host’s eggs to maintain the clutch size, further reducing suspicion.

Once the cuckoo chick hatches, it instinctively pushes the other eggs or hatchlings out of the nest, securing all food and care for itself. The foster parents, unaware of the deception, tirelessly feed and nurture the growing cuckoo chick, which often grows much larger than its unsuspecting caretakers. This process ensures the young cuckoo receives ample resources without competition.

The strategy allows cuckoos to reproduce efficiently without investing in parental care, but it comes at a cost to the host birds, whose own offspring rarely survive. This fascinating yet ruthless survival technique highlights nature’s complex interactions and adaptations. Despite its parasitic behavior, the cuckoo plays an important role in ecological balance, shaping the evolution of host species to develop defenses against deception. 