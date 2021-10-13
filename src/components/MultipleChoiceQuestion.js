import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Button, View } from "react-native";

import Divider from "./Divider";

import _ from "lodash";

function AnswerButton({ children, checkAnswer }) {
  return <Button onPress={checkAnswer} title={children} color="#70a1e6" />;
}

export default function MultipleChoiceQuestion({
  prompt,
  allAnswers,
  actualAnswer,
  handleAnswer,
}) {
  const [proposedAnswers, setProposedAnswers] = useState([]);

  // Sample answers on mount
  useEffect(() => {
    let answer = actualAnswer;
    let randomSample = _.sampleSize(allAnswers, 4);
    if (!randomSample.includes(answer)) {
      randomSample.pop();
      randomSample.push(answer);
    }
    randomSample = _.shuffle(randomSample);
    setProposedAnswers(randomSample);
  }, [prompt]);

  const renderAnswers = (proposedAnswers, actualAnswer) => {
    console.log(proposedAnswers);

    return proposedAnswers.map((proposedAnswer, index) => {
      let isRightAnswer = proposedAnswer === actualAnswer;

      return (
        <AnswerButton
          key={index}
          checkAnswer={() => handleAnswer(isRightAnswer)}
        >
          {proposedAnswer}
        </AnswerButton>
      );
    });
  };

  return (
    <View>
      <Text style={styles.prompt}>{`${prompt}`}</Text>
      <Divider />
      {renderAnswers(proposedAnswers, actualAnswer)}
    </View>
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
