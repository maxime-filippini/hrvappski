import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Button, Animated, TextInput } from "react-native";

import Divider from "./Divider";

export default function MultipleChoiceQuestion({
  prompt,
  actualAnswer,
  onAnswer,
}) {
  const [input, setInput] = useState("");

  const pos = new Animated.ValueXY({ x: 0, y: 0 });

  const animate_out = (callback) => {
    Animated.spring(pos, {
      toValue: { x: 400, y: 0 },
      bounciness: 0,
      speed: 30,
      useNativeDriver: false,
    }).start(callback);
  };

  const checkAnswer = (isRightAnswer) => {
    animate_out(() => onAnswer(isRightAnswer));
  };

  const renderInputField = (actualAnswer) => {
    return (
      <TextInput
        placeholder="Write answer"
        keyboardType="default"
        value={input}
        onChangeText={(v) => setInput(v)}
        onSubmitEditing={(v) => {
          checkAnswer(v === actualAnswer);
          setInput("");
        }}
      />
    );
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
      {renderInputField(actualAnswer)}
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
