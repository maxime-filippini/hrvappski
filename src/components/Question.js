import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, Button, Animated } from "react-native";

import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TypedQuestion from "./TypedQuestion";

export default function Question({
  prompt, // Question prompt
  allAnswers, // Bank of possible answers
  actualAnswer, // Used to determine if question is answered right
  answerType, // Used to determine type of question to render
  quizHandleAnswer, // Passed by the quizz, necessary for scoring
}) {
  const refTextInput = useRef(null);

  // 1. Animation stuff
  const pos = new Animated.ValueXY({ x: -300, y: 0 });

  const animate_in = () => {
    Animated.spring(pos, {
      toValue: { x: 0, y: 0 },
      bounciness: 0,
      speed: 30,
      useNativeDriver: false,
    }).start();
  };

  const animate_out = (callback) => {
    Animated.spring(pos, {
      toValue: { x: 400, y: 0 },
      bounciness: 0,
      speed: 30,
      useNativeDriver: false,
    }).start(callback);
  };

  useEffect(() => animate_in(), [pos]);

  // 2. Handle answers
  const questionHandleAnswer = (isRightAnswer) => {
    animate_out(() => {
      quizHandleAnswer(isRightAnswer);
      refTextInput.current.focus();
    });
  };

  // Rendering
  let question;

  if (answerType === "multiple-choice") {
    question = (
      <MultipleChoiceQuestion
        prompt={prompt}
        allAnswers={allAnswers}
        actualAnswer={actualAnswer}
        handleAnswer={questionHandleAnswer}
      />
    );
  } else if (answerType === "typed") {
    question = (
      <TypedQuestion
        prompt={prompt}
        actualAnswer={actualAnswer}
        handleAnswer={questionHandleAnswer}
        refTextInput={refTextInput}
      />
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: pos.x }, { translateY: pos.y }] },
      ]}
    >
      {question}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: 300,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  prompt: {
    fontSize: 20,
    color: "#0f228a",
    margin: 0,
    alignSelf: "center",
  },
});
