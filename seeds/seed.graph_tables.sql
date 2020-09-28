BEGIN;

TRUNCATE
    graphusers,
    piecesteps,
    assignedpieces
    RESTART IDENTITY CASCADE;

INSERT INTO graphusers (username, password)
VALUES
    ('GrapherOne', '$2a$10$l7iIvtFcIuTLVlI5HMGsnuBGKGM0a1nu0c.l3hvLWreXJPyMcpiy2
'),
    ('GrapherTwo', '$2a$05$xEMG8pU30nOMdX3FF/wGgefXI6PIydjXXugn53yQGvZyi7NMKeYPK
'),
    ('GrapherThree', 'passwordThree'),
    ('GrapherFour', 'paswordFour');


INSERT INTO assignedpieces  (user_id, userName, piece)
VALUES
    (1, 'GrapherOne', '2112'),
    (2, 'GrapherTwo', 'Baired'),
    (3, 'GrapherThree','2112'),
    (4, 'GrapherFour', 'MSLCRS(SOLO)');

INSERT INTO piecesteps  (user_id, title, content)
VALUES
    (1, '2112','One dance initiates snapping. All other dancers slowly join in. Dancer who starts snaps gives a loud clap to stop it' ),
    (1, 'Baired', 'Dancers solo onto stage from opposite downstage wings, one mover at a time with a 30 second space of time between enterances'),
    (1, 'MSLCRS(SOLO)', 'Dancer (soloist) starts downstage in the chair facing upstage with a large mirror covering the back sham');



COMMIT;
