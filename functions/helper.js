// function to push answers query into the quiz questions object -- USED IN GET /quizzes/:quizid
const { getAllEmails } = require('../db/queries/users')

const pushAnswersIntoQuestionObject = (array1, array2) => {
  const updatedQuestionArray = array1.map(questionObject => {
    const answersArrayForEachQuestion = array2.filter(answersObject => {
      return questionObject.question_id === answersObject.question_id
    })

    questionObject["answers"] = answersArrayForEachQuestion;
    return questionObject;
  })
  return updatedQuestionArray;
}

// function to calculate score for quiz -- USED IN POST /quizzes/:quizid
const calculateQuizScore = (answersArray, inputObject) => {
  const userAnswer = Object.values(inputObject);
  const correctAnswer = [];
  let score = 0;
  for (const answers of answersArray) {
    correctAnswer.push(answers.answer)
  }
  console.log(userAnswer);
  console.log(correctAnswer);
  for (let i = 0; i < correctAnswer.length; i++) {
    if (correctAnswer[i] === userAnswer[i]) {
      score += 1;
    }
  }
  console.log(score);
  return score;
}

// return boolean value true if quiz is public
const returnBooleanIsPublic = (privacy) => {
  if (privacy === 'private') {
    return false;
  }
  return true;
}

// og function
const pushAnswerIntoQuestion = (array1, array2) => {
  const updatedArray = array1.map(x => {
    const questionAnswers = array2.filter(y => {
      return x.question_id === y.question_id
    })

    x["answers"] = questionAnswers;
    console.log("RESULT TEST" ,x);
    return x;
  })
  return updatedArray;
}

const userValidator = function (userEmail) {
  return getAllEmails()
  .then(data => {
    for(const user of data) {
      if (userEmail === user.email) {
        const result = true;
        return result;
      }
    }
    const result = false;
    return result;
  })
}


module.exports = { pushAnswersIntoQuestionObject, calculateQuizScore, returnBooleanIsPublic, userValidator }
