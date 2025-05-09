### Probabilistic Data Structure

> "Finally his eyes grow dim, and he no longer knows whether it's really getting darker or just his eyes that are deceiving him. But he seems now to see an inextinguishable light begin to shine from the darkness behind the door. He doesn't have long to live now." 


#### Prologue
In the year of 2025, everybody is talking and doing AI things... Probabilistic Data Structure, or PDS for short, doesn't have direct bearing on AI but more to do with data analytic issue. If records to be processed are ten thousands then any RDBMS will do. If records to be processed are ten millions or even ten billions and you are more concerned with speed and size rather than accuracy, PDS is an obvios choice. 


#### I. Deterministic vs. Probabilistic 
Most people of my era have read the book [Algorithms and Data Structures by Niklaus Wirth (1985)](https://informatika-21.ru/pdf/AD.pdf). Data structures are simply organized data working in a specific way, ie. array, list, stack. queue and tree are canonical data structures to be taught in university, so to speak. But there are also hash, collection, bag, dictionary and many more... 

All of them shares common characteristics: 
- Resides in memory; 
- Memory consumed is proportional to number of elements; 
- No matter the order of data, it always works as expected; 
- Subject to different levels of [Time complexity](https://en.wikipedia.org/wiki/Time_complexity). 

Within organized data of any form, there are three kinds of problem: 
- Cardinality: count number of unique elements; 
- Membership: test if a specific element exists; 
- Frequency: how many times an element appears;

It is easy to handle with a table in MariaDB, for example: 
```
USE test; 

CREATE TABLE t (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value TEXT
);

-- Non-unique index on first 255 characters of the 'value' field
CREATE INDEX idx_value ON t(value(255)); 
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

-- Frequency 
SELECT count(*) as freq FROM t WHERE value='David'; 

3
```

As you can see, we use a single data structure, ie. table, to address the three problems. Owning to [ACID](https://en.wikipedia.org/wiki/ACID) properties, RDBMS stores data on disk. By means of index, it just know where to pull out data to make aggregation accordingly. 
![alt cardinality](img/t.card.JPG)
![alt membership](img/t.member.JPG)
![alt frequency](img/t.freq.JPG)

But when we have ten thousands or ten millions of records, storing and counting table in real time is impractical or even impossible. This is where probabilistic data structure comes into play. 


#### II. Bloom Filter 


#### III. Cuckoo Filter 


#### IV. HyperLogLog


#### V. TopK


#### VI. Bibliography 
1. [Understanding Probabilistic Data Structures with 112,092 UFO Sightings - Guy Royse - NDC Oslo 2023](https://youtu.be/M6XOniVANKI)
2. [Understanding Probabilistic Data Structures with UFO Sightings | Guy Royse](https://youtu.be/2Dzc7fxA0us)
3. [Intro to Probabilistic Data Structures by ANDREA IACONO](https://youtu.be/Y66Uy1he3Vo)
4. [Probabilistic data structures by Andrea Iacono](https://youtu.be/bYyRwGFSFbQ)
5. [A problem so hard even Google relies on Random Chance](https://youtu.be/lJYufx0bfpw)
6. [Counting BILLIONS with Just Kilobytes? Meet HyperLogLog!](https://youtu.be/f69hh3KgFEk)
7. [HyperLogLog: A Simple but Powerful Algorithm for Data Scientists](https://chengweihu.com/hyperloglog/)
8. [The Trial by Franz Kafka](https://www.gutenberg.org/cache/epub/7849/pg7849-images.html)


#### Epilogue


### EOF (2025/05/30)