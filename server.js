const express = require('express');
const dances = require('./dances.json');
var os = require('os');
var ifaces = os.networkInterfaces();

const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  let ip= "";
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
	ip+=(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        ip+=(ifname, iface.address);
      }
      ++alias;
    });
  });

  res.render('index', {
    title: 'Lovely Dances (' + ip + ')',
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
