DROP DATABASE IF EXISTS time_thrive_db;
CREATE DATABASE time_thrive_db;
\c time_thrive_db;

CREATE TABLE statistics (
  country VARCHAR(255) PRIMARY KEY,
  women FLOAT,
  men FLOAT
);

CREATE TABLE utilisateur(
    id SERIAL PRIMARY KEY ,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mot_de_passe VARCHAR(255)
);

\copy statistics FROM 'server/database/statistics.csv' DELIMITER ';' CSV HEADER;
