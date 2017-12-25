DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  fname TEXT NOT NULL,
  lname TEXT NOT NULL

);

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS question_follows;

CREATE TABLE question_follows (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

DROP TABLE IF EXISTS replies;

CREATE TABLE replies (
  id INTEGER PRIMARY KEY,
  body TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  reply_id INTEGER,

  FOREIGN KEY (reply_id) REFERENCES replies(id)
  FOREIGN KEY (user_id) REFERENCES users(id)
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

DROP TABLE IF EXISTS question_likes;

CREATE TABLE question_likes (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO
  users (fname, lname)
VALUES
  ('Louisa', 'Xue'),
  ('Winston', 'Galas'),
  ('Prince', 'Harry');

INSERT INTO
  questions (title, body, user_id)
VALUES
  ("What is sqlite3?","We don't know what we're doing!!!! Please help", 1),
  ("What is coding?", "I'm here at App Academy :P", 2000);

INSERT INTO
  replies (body, user_id, question_id, reply_id)
VALUES
  ("Sqlite3 is super dumb but nah I'm just kidding.", 2, 1, NULL),
  ("Okay good because I like Sqlite3", 3, 1, 1);

INSERT INTO
  question_likes (user_id, question_id)
VALUES
  (2, 2),
  (3, 2);
