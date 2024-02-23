DROP DATABASE IF EXISTS time_thrive_db;
CREATE DATABASE time_thrive_db;
\c time_thrive_db;

CREATE TABLE statistics (
  country VARCHAR(255) PRIMARY KEY,
  women FLOAT,
  men FLOAT
);

\copy statistics FROM 'server/database/statistics.csv' DELIMITER ';' CSV HEADER;
