BEGIN;

TRUNCATE
    costume,
    performanceSpace,
    pieceSteps,
    assignedPieces,
    pieceOptions,
    graphPasswords,
    graphUsers
    RESTART IDENTITY CASCADE;

    


INSERT INTO costume (id, piece, costume)
VALUES
    ('1','2112','Black High Wasted Shorts/White Halter Turtleneck Top' ),
    ('2','Baired', 'Nude Shorts'),
    ('3','2112', 'Black High Wasted Shorts/White Halter Turtleneck Top'),
    ('4', 'MSLCRS(SOLO)', 'Balck Velcro Leo');

INSERT INTO performanceSpace (id, stage)
VALUES
    ('1','Studio 3' ),
    ('2','Main Stage'),
    ('3','Blackbox Theater'),
    ('4','STAGE 6');

INSERT INTO pieceSteps (id, title, content)
VALUES
    ('1','2112','One dance initiates snapping. All other dancers slowly join in. Dancer who starts snaps gives a loud clap to stop it' ),
    ('2','Baired', 'Dancers solo onto stage from opposite downstage wings, one mover at a time with a 30 second space of time between enterances'),
    ('3', 'MSLCRS(SOLO)', 'Dancer (soloist) starts downstage in the chair facing upstage with a large mirror covering the back sham');

INSERT INTO assignedPieces (id, userName, piece)
VALUES
    ('1', 'GrapherOne', '2112'),
    ('2', 'GrapherTwo', 'Baired'),
    ('3', 'GrapherThree','2112'),
    ('4', 'GrapherFour', 'MSLCRS(SOLO)');

INSERT INTO pieceOptions (id, title)
VALUES
    ('1','2112'),
    ('2','Baired'),
    ('3', 'MSLCRS(SOLO)');

INSERT INTO graphPasswords (id, title, content)
VALUES
    ('1', 'GrapherOne', 'passwordOne'),
    ('2', 'GrapherTwo', 'passwordTwo'),
    ('3', 'GrapherThree', 'passwordThree'),
    ('4', 'GrapherFour', 'passwordFour');

INSERT INTO graphUsers (id, title, person)
VALUES
    ('1', 'GrapherOne', 'Grapher One'),
    ('2', 'GrapherTwo', 'Grapher Two'),
    ('3', 'GrapherThree', 'Grapher Three'),
    ('4', 'GrapherFour', 'Grapher Four');


COMMIT;