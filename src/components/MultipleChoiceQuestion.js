import React, { useEffect } from "react";
import { Text, StyleSheet, Button, Animated } from "react-native";

import Divider from "./Divider";

function AnswerButton({ children, checkAnswer }) {
  return <Button onPress={checkAnswer} title={children} color="#70a1e6" />;
}

export default function MultipleChoiceQuestion({
  prompt,
  proposedAnswers,
  actualAnswer,
  onAnswer,
}) {
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

  const checkAnswer = (isRightAnswer) => {
    animate_out(() => onAnswer(isRightAnswer));
  };

  const renderAnswers = (proposedAnswers, actualAnswer) => {
    return proposedAnswers.map((proposedAnswer, index) => {
      let isRightAnswer = proposedAnswer === actualAnswer;

      return (
        <AnswerButton
          key={index}
          checkAnswer={() => checkAnswer(isRightAnswer)}
        >
          {proposedAnswer}
        </AnswerButton>
      );
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: pos.x }, { translateY: pos.y }] },
      ]}
    >
      <Text style={styles.prompt}>{`${prompt}`}</Text>
      <Divider />
      {renderAnswers(proposedAnswers, actualAnswer)}
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
