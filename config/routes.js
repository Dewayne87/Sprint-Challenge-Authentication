const axios = require('axios');
const knex = require('knex');
const dbconfig = require('../knexfile');
const db = knex(dbconfig.development);
const bcrypt = require('bcryptjs');
const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const { authenticate } = require('../auth/authenticate');3

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes',authenticate, getJokes);
};

createToken = (user) => {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: "36hr",
  }
  return jwt.sign(payload, secret, options);
}


function register(req, res) {
  const newUser = req.body;
  if (!newUser.password || !newUser.username) {
    return res
      .status(412)
      .json('Please provide Username and/or password')
  }
  const protectedPassword = bcrypt.hashSync(newUser.password, 14);
  newUser.password = protectedPassword;
  db('users')
    .insert(newUser)
    .then(id => {
      res
        .status(201)
        .json({ id })
    })
    .catch(err => {
      res
        .status(500)
        .json(err)
    })
}

function login(req, res) {
  const bodyUser = req.body;
  if (!bodyUser.password || !bodyUser.username) {
    return res
      .status(404)
      .json('Please provide Username and/or password')
  }
  db('users')
    .where({ username: bodyUser.username })
    .then(user => {
      if (user.length && bcrypt.compareSync(bodyUser.password, user[0].password)) {
        const token = createToken(user);
        res
          .status(200)
          .json({ id: user[0].id, token })
      } else {
        res
          .status(401)
          .json({ message: 'Incorrect Username and/or Password' })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json(error)
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
