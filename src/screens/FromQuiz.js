import * as React from "react";
import { Text, View } from "react-native";
import Quiz from "../components/Quiz";

export default function FromQuizScreen({ navigation }) {
  const questions = require("../../data/questions.json");
  return <Quiz questions={questions} navigation={navigation} />;
}
