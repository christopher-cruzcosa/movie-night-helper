DROP DATABASE IF EXISTS movie_night_helperdb;

CREATE DATABASE movie_night_helperdb;

USE movie_night_helperdb;


CREATE TABLE movies (
  id int NOT NULL AUTO_INCREMENT,
  movie_title varchar(255) NOT NULL,
  PRIMARY KEY (id)
);
