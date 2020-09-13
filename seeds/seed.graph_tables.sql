BEGIN;

TRUNCATE
    costume,
    piecesteps,
    assignedpieces,
    pieceoptions,
    graphpasswords,
    graphusers
    RESTART IDENTITY CASCADE;

    


INSERT INTO costume (piece, costume)
VALUES
    ('2112','Black High Wasted Shorts/White Halter Turtleneck Top' ),
    ('Baired', 'Nude Shorts'),
    ('2112', 'Black High Wasted Shorts/White Halter Turtleneck Top'),
    ( 'MSLCRS(SOLO)', 'Balck Velcro Leo');


INSERT INTO piecesteps  (title, content)
VALUES
    ('2112','One dance initiates snapping. All other dancers slowly join in. Dancer who starts snaps gives a loud clap to stop it' ),
    ('Baired', 'Dancers solo onto stage from opposite downstage wings, one mover at a time with a 30 second space of time between enterances'),
    ( 'MSLCRS(SOLO)', 'Dancer (soloist) starts downstage in the chair facing upstage with a large mirror covering the back sham');

INSERT INTO assignedpieces  (userName, piece)
VALUES
    ( 'GrapherOne', '2112'),
    ( 'GrapherTwo', 'Baired'),
    ( 'GrapherThree','2112'),
    ( 'GrapherFour', 'MSLCRS(SOLO)');

INSERT INTO pieceoptions (title)
VALUES
    ('2112'),
    ('Baired'),
    ( 'MSLCRS(SOLO)');

INSERT INTO graphpasswords (title, content)
VALUES
    ('GrapherOne', 'passwordOne'),
    ('GrapherTwo', 'passwordTwo'),
    ('GrapherThree', 'passwordThree'),
    ('GrapherFour', 'passwordFour');

INSERT INTO graphusers (title, person)
VALUES
    ('GrapherOne', 'Grapher One'),
    ('GrapherTwo', 'Grapher Two'),
    ('GrapherThree', 'Grapher Three'),
    ('GrapherFour', 'Grapher Four');


COMMIT;