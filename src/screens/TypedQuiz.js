import * as React from "react";
import _ from "lodash";
import QuizComponent from "../components/QuizComponent";

export default function TypedQuizScreen({ navigation, questions }) {
  return (
    <QuizComponent
      navigation={navigation}
      questions={questions}
      answerType="typed"
    />
  );
}
