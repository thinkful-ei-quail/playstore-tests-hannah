const express = require('express');
const morgan = require('morgan');

const playStore = require('./play-store');

const app = express();

app.use(morgan('common'));

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
    filteredApps.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(filteredApps);
});

app.listen(8000, () => {
  console.log('Server started on Port 8000');
});
