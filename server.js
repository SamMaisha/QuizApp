// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const { getUserById, addUser, getUserIdByEmail } = require('./db/queries/users')
const { userValidator } = require('./functions/helper')
const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const quizzesRoutes = require('./routes/quizzes');
const usersRoutes = require('./routes/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/quizzes', quizzesRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register');
})

app.post('/register', (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  return userValidator(email)
   .then(result => {//would user query to insert the req.body user params into database (already made)
                      //after the insert query, youd call the getUserByEmail, grab the id, and set the cookie to the new users id
    if (result === false) { //validator works -- tested with email already in database
      const userObject = {
        name: 'Bob',
        email: email,
        password: password
      }
      addUser(userObject)
      .then(getUserIdByEmail(email)
      .then(data => {
        const userId = data.id;
        res.cookie('userId', userId) //tested and cookie was set with user 6 in a fresh db 
        res.redirect('/quizzes');
      }))
    }
    if (result === true) {
      console.log('email already in use');
      res.redirect('/quizzes');
    }
   })
})

app.post('/login', (req, res) => { //simple login validator yet, does recognize a user if you pick from one of the users in the seeds
  const email = req.body.username;
  const password = req.body.password;
  getUserById(1)
  .then(data => {
    const userEmail = data.email
    const userPassword = data.password
    const userId = data.id
    if (email !== userEmail || password !==userPassword) {
      console.log('uh oh')
      res.redirect('/quizzes');
    }
    else if (email === userEmail && password === userPassword) {
      console.log('all good')
      res.cookie('user_id', userId)
      res.redirect('/quizzes')
    }
    })
  })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
