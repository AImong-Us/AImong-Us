require('dotenv').config();
const exp = require('constants');
const path = require('path');

const express = require('express');
const app = express();
const PORT = 3000;
const DB_KEY = process.env.DB_KEY;

const routerAPI = require('./routes/api.js');

app.use(express.json());

app.use('/client', express.static(path.resolve(__dirname, '..', 'client')));

app.use('/api', routerAPI);

app.get('/login', (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', 'client', 'login.html'));
});

app.get('/signup', (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', 'client', 'signup.html'));
});

app.post(
  '/login',
  //middleware in usercontroller to verify username
  //middleware in usercontorller to verify pw
  //middleware in usercontroller to generate session
  //middleware in cookieController to set session cookie
  (req, res) => {
    res.status(302).redirect('/');
  }
);

app.post(
  '/signup',
  //middleware in dbController to create username and pw and session
  //middleware in cookieController to set session cookie
  (req, res) => {
    res.status(302).redirect('/');
  }
);

app.get('/', (req, res) =>
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
);

//catch-all route
app.use('/', (req, res, next) =>
  //TODO add a 404 page to route to
  next({
    log: 'Express catch all handler caught unknown route',
    status: 404,
    message: { err: 'Route not found' },
  })
);

const defaultErr = {
  log: 'Express error handler caught an unknown middleware error',
  status: 400,
  message: { err: 'An error occurred' },
};

app.use((err, req, res, next) => {
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
