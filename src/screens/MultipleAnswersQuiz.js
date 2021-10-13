import * as React from "react";
import QuizComponent from "../components/QuizComponent";

export default function MultipleAnswersQuiz({
  navigation,
  questions,
  nQuestions,
}) {
  return (
    <QuizComponent
      navigation={navigation}
      questions={questions}
      nQuestions={nQuestions}
      answerType="multiplechoice"
    />
  );
}
