DELIMITER ;

DROP DATABASE IF EXISTS simposium;

CREATE DATABASE simposium;

USE simposium;

DROP USER IF EXISTS Solomeo;

CREATE USER 'Solomeo'@'%' IDENTIFIED BY '4525MySql1225';

GRANT ALL PRIVILEGES ON simposium.* TO 'Solomeo'@'%';

# DROP USER Solomeo;
# DROP DATABASE simposium;
