import * as React from "react";
import { Text, View } from "react-native";
import Quiz from "../components/Quiz";
import _ from "lodash";

export default function ToQuizScreen({ navigation }) {
  let questions = require("../../data/questions.json");
  questions = _.invert(questions);
  return <Quiz questions={questions} navigation={navigation} />;
}
