'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const server = express();

server.use(express.static(path.join(__dirname, 'public')));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

server.post('/saveUser', (req, res, next) => {
  const rawdata = fs.readFileSync(path.join(__dirname, 'users.json'));
  const users = JSON.parse(rawdata);

  if (users.users.indexOf(req.body.email) !== -1) {
    return res.status(409).send('Email already exists!');
  }

  users.users.push(req.body.email);
  const newUsers = JSON.stringify(users, null, 2);


  fs.writeFile(path.join(__dirname, 'users.json'), newUsers, ((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json(users);
  }));
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log('Server listening on port ' + port);
});


