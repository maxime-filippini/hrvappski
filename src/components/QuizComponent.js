import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import _ from "lodash";

import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TypedQuestion from "./TypedQuestion";

export default function QuizComponent({
  navigation,
  questions,
  answerType,
  nQuestions,
}) {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const [remainingQuestions, setRemainingQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  let allAnswers = Object.values(questions);

  // On mount
  useEffect(() => {
    let shuffledQuestions = _.shuffle(Object.keys(questions)).slice(
      0,
      nQuestions
    );
    let question = {
      question: shuffledQuestions[0],
      answer: questions[shuffledQuestions[0]],
    };

    setCurrentQuestion(question);
    setRemainingQuestions(shuffledQuestions.slice(1));
    setTotalQuestions(shuffledQuestions.length);
  }, []);

  const goToNextQuestion = () => {
    setRemainingQuestions(remainingQuestions.slice(1));

    let question = {
      question: remainingQuestions[0],
      answer: questions[remainingQuestions[0]],
    };
    setCurrentQuestion(question);
  };

  const handleQuestionAnswer = (wasAnswerRight) => {
    if (wasAnswerRight) {
      setScore(() => score + 1);
    }
    if (remainingQuestions.length > 0) {
      goToNextQuestion();
    } else {
      setHasFinished(true);
    }
  };

  const buildTypedQuestion = (qstn) => {
    return (
      <TypedQuestion
        prompt={qstn["question"]}
        actualAnswer={qstn["answer"]}
        onAnswer={handleQuestionAnswer}
      />
    );
  };

  const buildMultipleChoiceQuestion = (qstn, allAnswers) => {
    let answer = qstn["answer"];
    let randomSample = _.sampleSize(allAnswers, 4);
    if (!randomSample.includes(answer)) {
      randomSample.pop();
      randomSample.push(answer);
    }

    randomSample = _.shuffle(randomSample);

    return (
      <MultipleChoiceQuestion
        prompt={qstn["question"]}
        proposedAnswers={randomSample}
        actualAnswer={answer}
        onAnswer={handleQuestionAnswer}
      />
    );
  };

  const renderQuiz = () => {
    if (!hasStarted) {
      return <Button title="Start Quiz!" onPress={() => setHasStarted(true)} />;
    } else if (hasStarted && !hasFinished) {
      return (
        <>
          <Text style={styles.scoreHeader}>{"Score:"}</Text>
          <Text style={styles.highScore}>{score}</Text>
          {answerType === "multiple-choice"
            ? buildMultipleChoiceQuestion(currentQuestion, allAnswers)
            : buildTypedQuestion(currentQuestion)}
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.scoreHeader}>Final score</Text>
          <Text style={styles.finalScore}>{`${score}/${totalQuestions}`}</Text>
          <Button
            title="Go back"
            onPress={() => navigation.navigate("QuizSelect")}
          />
        </>
      );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {renderQuiz()}
    </View>
  );
}

const styles = StyleSheet.create({
  highScore: {
    fontSize: 40,
    color: "#0f228a",
    marginBottom: 20,
  },
  scoreHeader: {
    fontSize: 20,
    margin: 0,
  },
  finalScore: {
    fontSize: 40,
    color: "#0f228a",
    marginBottom: 20,
  },
});
