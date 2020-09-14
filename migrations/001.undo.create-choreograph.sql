DROP TABLE IF EXISTS costume;

DROP TABLE IF EXISTS piecesteps;

ALTER TABLE piecesteps
    DROP COLUMN users;

DROP TABLE IF EXISTS assignedpieces;

ALTER TABLE assignedpieces
    DROP COLUMN users;

DROP TABLE IF EXISTS pieceoptions;
 
DROP TABLE IF EXISTS graphpasswords;

ALTER TABLE graphpasswords
    DROP COLUMN users;

DROP TABLE IF EXISTS graphusers;








