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

app.get('/api/grades', (req, res, next) => {
  const sql = ' SELECT * FROM "grades"; ';
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/grades/:gradeId', (req, res, next) => {
  if (!req.params.gradeId) {
    return next(new ClientError('Missing id', 400));
  }
  const gradeId = parseInt(req.params.gradeId);
  if (gradeId < 1 || isNaN(gradeId)) {
    return next(new ClientError('Invalid id', 400));
  }
  const sql = `SELECT * FROM "grades"
               WHERE "gradeId" = $1;`;
  const value = [gradeId];
  db.query(sql, value)
    .then(result => {
      if (result.rows.length !== 0) {
        res.status(200).json(result.rows[0]);
      } else {
        throw new ClientError(`Could not find "id" of ${gradeId}`, 404);
      }
    })
    .catch(err => next(err));

});

app.post('/api/grades', (req, res, next) => {
  if (!req.body.name || !req.body.course || !req.body.grade) {
    return next(new ClientError('Values cannot be empty', 400));
  }
  const grade = parseInt(req.body.grade);
  if (grade < 0 || isNaN(grade)) {
    return next(new ClientError('grade must be positive integer', 400));
  }
  const sql = `INSERT into "grades" ("gradeId", name, course, grade)
                            VALUES  (default, $1, $2, $3)
                            returning *;`;
  const values = [req.body.name, req.body.course, grade];
  db.query(sql, values)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.put('/api/grades/:gradeId', (req, res, next) => {
  if (!req.body.grade) {
    return next(new ClientError('Missing value for grade', 400));
  }
  if (!req.params.gradeId) {
    return next(new ClientError('Missing id', 400));
  }
  const gradeId = parseInt(req.params.gradeId);
  if (gradeId < 1 || isNaN(gradeId)) {
    return next(new ClientError('Invalid id', 400));
  }
  const newGrade = parseInt(req.body.grade);
  if (newGrade < 0 || isNaN(newGrade)) {
    return next(new ClientError('Grade must be positive integer', 400));
  }
  const sql = `UPDATE "grades"
                      SET grade = $2
                      WHERE "gradeId" = $1
                      returning *;`;
  const values = [gradeId, newGrade];
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
