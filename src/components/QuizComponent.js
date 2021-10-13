import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import _ from "lodash";

import Question from "./Question";

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

  // On mount, setup questions
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

  // Process to go to next question
  const goToNextQuestion = () => {
    setRemainingQuestions(remainingQuestions.slice(1));

    let question = {
      question: remainingQuestions[0],
      answer: questions[remainingQuestions[0]],
    };
    setCurrentQuestion(question);
  };

  // Quiz-level handling of answers
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

  // Rendering
  const renderQuiz = () => {
    if (!hasStarted) {
      return <Button title="Start Quiz!" onPress={() => setHasStarted(true)} />;
    } else if (hasStarted && !hasFinished) {
      return (
        <>
          <Text style={styles.scoreHeader}>{"Score:"}</Text>
          <Text style={styles.highScore}>{score}</Text>
          <Question
            prompt={currentQuestion["question"]}
            allAnswers={allAnswers}
            actualAnswer={currentQuestion["answer"]}
            answerType={answerType}
            quizHandleAnswer={handleQuestionAnswer}
          />
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
