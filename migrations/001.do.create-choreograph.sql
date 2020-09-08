CREATE TABLE graphUsers (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,   
)

CREATE TABLE graphPasswords (
    id INTEGER PRIMARY KEY GENERATED BY DEFUALT AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
)

CREATE TABLE pieceOptions (
    id INTEGER PRIMARY KEY GENERATED BY DEFUALT AS IDENTITY,
    title TEXT NOT NULL,
)

CREATE TABLE assignedPieces (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    piece TEXT NOT NULL,
)

CREATE TABLE pieceSteps (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT
)

CREATE TABLE peformanceSpace (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    stage TEXT,
)

CREATE TABLE costume (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    piece TEXT NOT NULL,
    costume TEXT.
)