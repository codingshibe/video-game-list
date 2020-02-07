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
  const sql = ' SELECT * from "grades"; ';
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/grades', (req, res, next) => {
  if (!req.body.name || !req.body.course || !req.body.grade) {
    res.status(400).json({ error: 'Values cannot be empty' });
  }
  const grade = parseInt(req.body.grade);
  if (grade < 0 || isNaN(grade)) {
    res.status(400).json({ error: 'Grade must be positive integer' });
  }
  const sql = `INSERT into "grades" ("gradeId", name, course, grade)
                            values  (default, $1, $2, $3)
                            returning *;`;
  const values = [req.body.name, req.body.course, grade];
  db.query(sql, values)
    .then(result => res.status(200).json(result.rows[0]))
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
