import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import _ from "lodash";

import Question from "./Question";

const N_QUESTIONS = 10;

export default function Quiz({ navigation, questions }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [currPrompt, setCurrPrompt] = useState(0);

  let prompts = _.shuffle(Object.keys(questions)).slice(0, N_QUESTIONS);
  let answers = Object.values(questions);

  const buildQuestion = (prompt, allAnswers) => {
    let randomSample = _.sampleSize(allAnswers, 4);
    let actualAnswer = questions[prompt];

    if (!randomSample.includes(actualAnswer)) {
      randomSample.pop();
      randomSample.push(actualAnswer);
    }

    randomSample = _.shuffle(randomSample);

    console.log(randomSample);

    return (
      <Question
        prompt={prompt}
        proposedAnswers={randomSample}
        actualAnswer={actualAnswer}
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
          {buildQuestion(prompts[currPrompt], answers)}
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.scoreHeader}>Final score</Text>
          <Text style={styles.finalScore}>{`${score}/${N_QUESTIONS}`}</Text>
          <Button
            title="Go back"
            onPress={() => navigation.navigate("QuizSelect")}
          />
        </>
      );
    }
  };

  const handleQuestionAnswer = (wasAnswerRight) => {
    if (wasAnswerRight) {
      setScore(() => score + 1);
    }
    if (currPrompt < N_QUESTIONS - 1) {
      setCurrPrompt(() => currPrompt + 1);
    } else {
      setHasFinished(true);
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
