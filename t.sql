USE test; 

CREATE TABLE t (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value TEXT
);

-- Non-unique index on first 255 characters of the 'value' field
CREATE INDEX idx_value ON t(value(255)); 

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
