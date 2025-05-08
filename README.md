### Probabilistic Data Structure

> "Finally his eyes grow dim, and he no longer knows whether it's really getting darker or just his eyes that are deceiving him. But he seems now to see an inextinguishable light begin to shine from the darkness behind the door. He doesn't have long to live now." 


#### Prologue
In the year of 2025, everybody is doing AI things... 


#### I. Deterministic vs. Probabilistic 
Most of the people of my era had read the book [Algorithms and Data Structures by Niklaus Wirth (1985)](https://informatika-21.ru/pdf/AD.pdf). 

```
USE test; 

CREATE TABLE t (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value TEXT
);

-- Non-unique index on first 255 characters of the 'value' field
CREATE INDEX idx_value ON t(value(255)); 
```

```
INSERT INTO t (value) VALUES
-- Highly duplicated (appears 5 times)
('Alice'), ('Alice'), ('Alice'), ('Alice'), ('Alice'),
('Bob'), ('Bob'), ('Bob'), ('Bob'), ('Bob'),
('Charlie'), ('Charlie'), ('Charlie'), ('Charlie'), ('Charlie'),

-- Moderately duplicated (appears 3 times)
('David'), ('David'), ('David'),
('Emma'), ('Emma'), ('Emma'),
('Fiona'), ('Fiona'), ('Fiona'),
('George'), ('George'), ('George'),

-- Slightly duplicated (appears 2 times)
('Hannah'), ('Hannah'),
('Isaac'), ('Isaac'),
('Jack'), ('Jack'),
('Katherine'), ('Katherine'),
('Liam'), ('Liam'),
('Mia'), ('Mia'),
('Nathan'), ('Nathan'),
('Olivia'), ('Olivia'),

-- Unique names (appears 1 time)
('Peter'), ('Quinn'), ('Rachel'), ('Samuel'), ('Taylor'), 
('Ursula'), ('Victor'), ('Willow'), ('Xavier'), ('Yvonne'), 
('Zachary'), ('Amber'), ('Brandon'), ('Catherine'), ('Derek'),
('Ella'), ('Frank'), ('Grace'), ('Harry'), ('Isabella'), 
('Jordan'), ('Kylie'), ('Leo'), ('Madison'), ('Noah'),
('Oscar'), ('Paige'), ('Quentin'), ('Rebecca'), ('Scott'),
('Tiffany'), ('Ulysses'), ('Vanessa'), ('Warren'), ('Xander'),
('Yasmine'), ('Zane'), ('Annabelle'), ('Bennett'), ('Celeste'),
('Dominic'), ('Eliza'), ('Frederick'), ('Gabrielle'), ('Henry'),
('Ivy'), ('Jasper'), ('Kayla'), ('Lucas'), ('Megan'),
('Nicholas'), ('Opal'), ('Preston'), ('Quincy'), ('Riley'),
('Sebastian'), ('Trinity'), ('Uriah'), ('Valerie'), ('Wesley'),
('Ximena'), ('Yosef'), ('Zara'), ('Anthony'), ('Bethany'),
('Cedric'), ('Daisy'), ('Edwin'), ('Francine'), ('Gavin'),
('Hailey'), ('Ian'), ('Juliet'), ('Kevin'), ('Lillian'),
('Mason'), ('Natalie'), ('Owen'), ('Penelope'), ('Ryan'),
('Sadie'), ('Tyler'), ('Uma'), ('Violet');
```

```
select value, count(*) 
from t
group by value
order by 2 desc 
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