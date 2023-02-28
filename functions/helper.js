const pushAnswersIntoQuestionObject = (array1, array2) => {
  const updatedQuestionArray = array1.map(questionObject => {
    const answersArrayForEachQuestion = array2.filter(answersObject => {
      return questionObject.question_id === answersObject.question_id
    })

    questionObject["answers"] = answersArrayForEachQuestion;
    console.log("RESULT TEST" ,questionObject);
    return questionObject;
  })
  return updatedQuestionArray;
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
module.exports = { pushAnswersIntoQuestionObject }
