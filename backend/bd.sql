DROP DATABASE IF EXISTS palabrados;
CREATE DATABASE palabrados DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
CREATE USER IF NOT EXISTS 'palabrados'@'localhost' IDENTIFIED BY 'palabrados';
GRANT ALL ON palabrados.* TO 'palabrados'@'localhost';

use palabrados;

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_name CHAR(15) NOT NULL,
    user_hashpass CHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
)   ENGINE=InnoDB;

CREATE TABLE scores (
    score_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY(score_id),
    FOREIGN KEY(user_id)REFERENCES users(user_id)
)   ENGINE=InnoDB;

CREATE TABLE dictionary (
    word_id INT NOT NULL AUTO_INCREMENT,
    word_name VARCHAR(10) NOT NULL,
    word_definition VARCHAR(100),
    word_length INT NOT NULL,
    PRIMARY KEY(word_id)
)   ENGINE=InnoDB;


