require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/games', (req, res, next) => {
  const sql = ' SELECT * FROM "games"; ';
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/games/:gameId', (req, res, next) => {
  if (!req.params.gameId) {
    return next(new ClientError('Missing id', 400));
  }
  const gameId = parseInt(req.params.gameId);
  if (gameId < 1 || isNaN(gameId)) {
    return next(new ClientError('Invalid id', 400));
  }
  const sql = `SELECT * FROM "games"
               WHERE "gameId" = $1;`;
  const value = [gameId];
  db.query(sql, value)
    .then(result => {
      if (result.rows.length !== 0) {
        res.status(200).json(result.rows[0]);
      } else {
        throw new ClientError(`Could not find "id" of ${gameId}`, 404);
      }
    })
    .catch(err => next(err));

});

app.post('/api/games', (req, res, next) => {
  if (!req.body.title || !req.body.platform || !req.body.price) {
    return next(new ClientError('Values cannot be empty', 400));
  }
  const price = parseInt(req.body.price);
  if (price < 0 || isNaN(price)) {
    return next(new ClientError('price must be positive integer', 400));
  }
  const sql = `INSERT into "games" ("gameId", title, platform, price)
                            VALUES  (default, $1, $2, $3)
                            returning *;`;
  const values = [req.body.title, req.body.platform, price];
  db.query(sql, values)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.put('/api/games/:gameId', (req, res, next) => {
  if (!req.body.title || !req.body.platform || !req.body.price) {
    return next(new ClientError('Values must not be empty', 400));
  }
  if (!req.params.gameId) {
    return next(new ClientError('Missing id', 400));
  }
  const gameId = parseInt(req.params.gameId);
  if (gameId < 1 || isNaN(gameId)) {
    return next(new ClientError('Invalid id', 400));
  }
  const newPrice = parseInt(req.body.price);
  if (newPrice < 0 || isNaN(newPrice)) {
    return next(new ClientError('price must be positive integer', 400));
  }
  const sql = `UPDATE "games"
                      SET title = $2, platform = $3, price = $4
                      WHERE "gameId" = $1
                      returning *;`;
  const values = [gameId, req.body.title, req.body.platform, newPrice];
  db.query(sql, values)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

app.delete('/api/grades/:gradeId', (req, res, next) => {
  if (!req.params.gradeId) {
    return next(new ClientError('Missing id', 400));
  }
  const gradeId = parseInt(req.params.gradeId);
  if (gradeId < 1 || isNaN(gradeId)) {
    return next(new ClientError('Invalid id', 400));
  }
  const sql = `DELETE FROM "grades"
                      WHERE "gradeId" = $1;`;
  const value = [gradeId];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port ', process.env.PORT);
});
