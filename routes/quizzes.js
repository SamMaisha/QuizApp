/*
 * All routes for Quizzes are defined here
 * Since this file is loaded in server.js into /quizzes,
 *   these routes are mounted onto /quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const quizQueries = require('../db/queries/quizzes');

// HOMEPAGE - show list of public quizzes
router.get('/', (req, res) => {
  quizQueries.getQuizzes()
  // returns an array of objects
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// CREATE QUIZ - render page
router.get('/create', (req, res) => {
})

// CREATE QUIZ - add newly created quiz to DB table
router.post('/',(req,res) => {

})


// VIEW QUIZ - show single quiz for user to attempt
router.get('/:quizid', (req, res) => {

})

// VIEW QUIZ - send quiz results to DB
router.post('/:quizid', (req, res) => {

})

module.exports = router;
