const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const playStore = require('./play-store');

const app = express();

app.use(morgan('common'));
app.use(cors());

app.get('/apps', (req, res) => {
  let { sort, genre } = req.query;

  let filteredApps = [...playStore];

  if (genre) {
    filteredApps = filteredApps.filter((app) => {
      return app.Genres.toLowerCase().includes(genre.toLowerCase());
    });
  }

  if (sort === 'rating') {
    sort = 'Rating';
  }
  if (sort === 'app') {
    sort = 'App';
  }

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Sort must be one of Rating or App');
    }
    filteredApps.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(filteredApps);
});

module.exports = app;