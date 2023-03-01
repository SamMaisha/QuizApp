/*
 * All routes for Quizzes are defined here
 * Since this file is loaded in server.js into /quizzes,
 *   these routes are mounted onto /quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quizzes");
const { pushAnswersIntoQuestionObject, calculateQuizScore, returnBooleanIsPublic } = require("../functions/helper");

//////////////////////////////////////////////////////////////////////////////////////////////
                     //HOMEPAGE - show list of public quizzes//
//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/", (req, res) => {
  quizQueries
    .getQuizzes()
    .then((result) => {
      const quizzes = result;
      res.render("index", {
        quizzes: quizzes
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////
                     //CREATE QUIZ - render page to create a new quiz//
//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/create", (req, res) => {
  res.render("quiz_create");
});

//////////////////////////////////////////////////////////////////////////////////////////////
                     //CREATE QUIZ - add newly created quiz to DB table//
//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/", (req, res) => {
  //parse body for submitted quiz
  const newQuiz = req.body;
  console.log(newQuiz);

// add quiz data to quizzes table
  const quizTitle = newQuiz["quiz-title"];
  const quizDescription = newQuiz["quiz-description"];
  const quizType = newQuiz["quiz-type"];
  const userId = req.cookies["user_id"];
  let quizId;
  const isPublic = returnBooleanIsPublic(newQuiz.privacy);

  quizQueries.addNewQuiz(userId, quizTitle, quizType, quizDescription, isPublic)
  .then(result => {
    quizId = result.id;
    const quizLink = `http://localhost:8080/quizzes/${quizId}`

// add quiz link to quizzes table
    return quizQueries.addQuizLink(quizId, quizLink)
  })
  .then(data =>{
      //console.log(data);
// insert questions into questions table
      const question1 = newQuiz["question-1"];
      const question2 = newQuiz["question-2"];
      const question3 = newQuiz["question-3"];
      const question4 = newQuiz["question-4"];
      const question5 = newQuiz["question-5"];
      return quizQueries.addQuizQuestions(quizId, question1, question2, question3, question4, question5)
    })
  .then(data => {
        // quiz_id for each question
        const idQuestion1 = data[0].id;
        const idQuestion2 = data[1].id;
        const idQuestion3 = data[2].id;
        const idQuestion4 = data[3].id;
        const idQuestion5 = data[4].id;

        // answers array for each question
        const answersQuestion1 = newQuiz["1answer-text"];
        const answersQuestion2 = newQuiz["2answer-text"];
        const answersQuestion3 = newQuiz["3answer-text"];
        const answersQuestion4 = newQuiz["4answer-text"];
        const answersQuestion5 = newQuiz["5answer-text"];

        // array index for correct answer
        const correctAnswerIndexQues1 = Number(newQuiz["1answer-radio"]);
        const correctAnswerIndexQues2 = Number(newQuiz["2answer-radio"]);
        const correctAnswerIndexQues3 = Number(newQuiz["3answer-radio"]);
        const correctAnswerIndexQues4 = Number(newQuiz["4answer-radio"]);
        const correctAnswerIndexQues5 = Number(newQuiz["5answer-radio"]);

        // insert answers for question 1 into quiz_answers table
        answersQuestion1.forEach((element, index) => {
          if (index === correctAnswerIndexQues1) {
            quizQueries.addQuizAnswer(quizId, idQuestion1, element, true)
          } else {
            quizQueries.addQuizAnswer(quizId, idQuestion1, element, false)
          }
        });

        // insert answers for question 2 into quiz_answers table
        answersQuestion2.forEach((element, index) => {
          if (index === correctAnswerIndexQues2) {
            quizQueries.addQuizAnswer(quizId, idQuestion2, element, true)
          } else {
            quizQueries.addQuizAnswer(quizId, idQuestion2, element, false)
          }
        });

        // insert answers for question 3 into quiz_answers table
        answersQuestion3.forEach((element, index) => {
          if (index === correctAnswerIndexQues3) {
            quizQueries.addQuizAnswer(quizId, idQuestion3, element, true)
          } else {
            quizQueries.addQuizAnswer(quizId, idQuestion3, element, false)
          }
        });

        // insert answers for question 4 into quiz_answers table
        answersQuestion4.forEach((element, index) => {
          if (index === correctAnswerIndexQues4) {
            quizQueries.addQuizAnswer(quizId, idQuestion4, element, true)
          } else {
            quizQueries.addQuizAnswer(quizId, idQuestion4, element, false)
          }
        });

        // insert answers for question 5 into quiz_answers table
        answersQuestion5.forEach((element, index) => {
          if (index === correctAnswerIndexQues5) {
            quizQueries.addQuizAnswer(quizId, idQuestion5, element, true)
          } else {
            quizQueries.addQuizAnswer(quizId, idQuestion5, element, false)
          }
        });
      })
      res.redirect('/quizzes');
});

//////////////////////////////////////////////////////////////////////////////////////////////
                     //VIEW QUIZ - show single quiz for user to attempt//
//////////////////////////////////////////////////////////////////////////////////////////////
router.get("/:quizid", (req, res) => {
  const quizId = req.params.quizid;
  quizQueries.getSelectedQuiz(quizId).
  then((resultQuestions) => {
    const quizQuestions = resultQuestions;

    quizQueries.getAnswersForSelectedQuiz(quizId)
    .then((resultAnswers) => {
      const quizAnswers = resultAnswers;
      const quizQuestionsAnswers = pushAnswersIntoQuestionObject(quizQuestions, quizAnswers);
      res.render("quiz_take",
    {quizzes: quizQuestionsAnswers
    });
    })
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////
                     //VIEW QUIZ - send quiz results to DB//
//////////////////////////////////////////////////////////////////////////////////////////////
router.post("/:quizid", (req, res) => {
  const quizId = req.params.quizid;
  userId = req.cookies["user_id"];
  console.log("QUIZ ID:",quizId);

  // get users answers and compare it to correct answer
  const userAnswers = req.body;
  quizQueries.getCorrectAnswerForQuiz(quizId).then((result) => {
    const correctAnswers = result;
    const quizScore = calculateQuizScore(correctAnswers, userAnswers);
    const quizResultLink = `http://localhost:8080/users/${userId}/quizzes/${quizId}`;
    quizQueries.addQuizResult(quizId, 1, quizScore, quizResultLink)
    .then((quizResult) => {
      if (!quizResult) {
        res.send("Oops! It appears that something has gone wrong")
      }
      res.redirect('/quizzes');
    })
  })
});

// MY QUIZZES - post route to delete a quiz {POST MVP}
router.post("/:quizid/delete", (req, res) => {});

module.exports = router;
