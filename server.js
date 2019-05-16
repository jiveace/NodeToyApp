const express = require('express');
const dances = require('./dances.json');

const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Lovely Dances',
    dances: dances.profiles
  });
});

app.get('/profile', (req, res) => {
  const dance = dances.profiles.find(p => p.id === req.query.id);
  res.render('profile', {
    title: `About ${dance.name} `,
    dance,
  });
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
