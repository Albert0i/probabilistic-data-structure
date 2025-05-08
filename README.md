### Probabilistic Data Structure

> "Finally his eyes grow dim, and he no longer knows whether it's really getting darker or just his eyes that are deceiving him. But he seems now to see an inextinguishable light begin to shine from the darkness behind the door. He doesn't have long to live now." 


#### Prologue
In the year of 2025, everybody is talking and doing AI things... 


#### I. Deterministic vs. Probabilistic 
Most of the people of my era had read the book [Algorithms and Data Structures by Niklaus Wirth (1985)](https://informatika-21.ru/pdf/AD.pdf). Data structures are just organized data working in a specific way, ie. array, list, stack. queue and tree are canonical widget on early university project, so to speak. But there are also hash, collection, bag, dictionary and many more... 

All and all, they share common but obvious characteristics: 
- Reside in memory; 
- Memory consumed is proportional to number of elements; 
- No matter the order of data, they always work as expected; 
- Subject to different levels of [Time complexity](https://en.wikipedia.org/wiki/Time_complexity). 

Typically speaking, there are three kinds problem in real life: 
- Cardinality : count number of unique elements; 
- Membership : test a specific element exists; 
- Frequency : how many times an element appear;

For hundreds of records, it is easy to handle with a table: 
```
USE test; 

CREATE TABLE t (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value TEXT
);

-- Non-unique index on first 255 characters of the 'value' field
CREATE INDEX idx_value ON t(value(255)); 
```

And insert our data accordingly then: 
```
-- Cardinality 
SELECT COUNT(*) as card 
FROM (SELECT DISTINCT value FROM t) t1; 

-- Membership 
SELECT EXISTS(SELECT 1 FROM t WHERE value = 'David') AS exists_check;

-- Frequency 
SELECT count(*) as freq FROM t WHERE value='David'; 
```

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