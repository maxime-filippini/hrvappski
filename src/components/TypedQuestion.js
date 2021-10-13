import React, { useState, useRef } from "react";
import { Text, StyleSheet, Button, View, TextInput } from "react-native";

import Divider from "./Divider";

const validate = (answer, actualAnswer) => {
  let chars = {
    č: "c",
    ć: "c",
    ž: "z",
    đ: "d",
    š: "s",
  };

  let newAnswer = answer;
  let newActualAnswer = actualAnswer;

  Object.keys(chars).forEach(
    (char) => (newAnswer = newAnswer.replace(char, chars[char]))
  );
  Object.keys(chars).forEach(
    (char) => (newActualAnswer = newActualAnswer.replace(char, chars[char]))
  );

  return (
    newAnswer.trim().toLowerCase() === newActualAnswer.trim().toLowerCase()
  );
};

export default function TypedQuestion({
  prompt,
  actualAnswer,
  handleAnswer,
  refTextInput,
}) {
  const [input, setInput] = useState("");

  const renderInputField = (actualAnswer) => {
    return (
      <TextInput
        placeholder="Write answer"
        keyboardType="default"
        value={input}
        autoFocus={true}
        ref={refTextInput}
        onChangeText={(v) => setInput(v)}
        onSubmitEditing={(v) => {
          handleAnswer(validate(input, actualAnswer));
          setInput("");
        }}
      />
    );
  };

  return (
    <View>
      <Text style={styles.prompt}>{`${prompt}`}</Text>
      <Divider />
      {renderInputField(actualAnswer)}
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
